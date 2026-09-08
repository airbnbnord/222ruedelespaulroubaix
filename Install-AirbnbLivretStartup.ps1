param(
  [int]$Port = 4174,
  [int]$StartupDelaySeconds = 0,
  [int]$MonitorIntervalSeconds = 30,
  [int]$TaskRepeatMinutes = 5
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSCommandPath
$WatchdogScript = Join-Path $Root "Start-AirbnbLivretWatchdog.ps1"
$StartupDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Startup"
$Launcher = Join-Path $StartupDir "Livret_Airbnb_Watchdog_4174.vbs"
$TaskName = "AirbnbLivret4174Watchdog"
$LocalAppData = $env:LOCALAPPDATA
if (-not $LocalAppData -and $env:USERPROFILE) {
  $LocalAppData = Join-Path $env:USERPROFILE "AppData\Local"
}
if (-not $LocalAppData) {
  $LocalAppData = $Root
}
$TaskLauncherDir = Join-Path $LocalAppData "AirbnbLivret-4174"
$TaskLauncher = Join-Path $TaskLauncherDir "Run-AirbnbLivretWatchdog.vbs"
$TaskPowerShellLauncher = Join-Path $TaskLauncherDir "Run-AirbnbLivretWatchdog.ps1"
$TaskEnsureLauncher = Join-Path $TaskLauncherDir "Ensure-AirbnbLivretServer.ps1"
$TaskEnsureCmd = Join-Path $TaskLauncherDir "Ensure-AirbnbLivretServer.cmd"
$TaskEnsureJs = Join-Path $TaskLauncherDir "Ensure-AirbnbLivretServer.js"
$StartupCmd = Join-Path $StartupDir "Livret_Airbnb_4174.cmd"

function Quote-PowerShellLiteral([string]$Value) {
  return "'" + ($Value -replace "'", "''") + "'"
}

if (-not (Test-Path -LiteralPath $WatchdogScript)) {
  throw "Watchdog script not found: $WatchdogScript"
}

New-Item -ItemType Directory -Force -Path $StartupDir | Out-Null
New-Item -ItemType Directory -Force -Path $TaskLauncherDir | Out-Null

$startCommand = "& $(Quote-PowerShellLiteral $WatchdogScript) -Port $Port -InitialDelaySeconds $StartupDelaySeconds -MonitorIntervalSeconds $MonitorIntervalSeconds"
$encodedCommand = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($startCommand))
$psCommand = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -EncodedCommand $encodedCommand"
$vbs = @"
Set shell = CreateObject("WScript.Shell")
shell.Run "$psCommand", 0, False
"@

Set-Content -LiteralPath $Launcher -Value $vbs -Encoding ASCII
Set-Content -LiteralPath $TaskLauncher -Value $vbs -Encoding ASCII
$taskLauncherScript = @"
`$ErrorActionPreference = "Stop"
& $(Quote-PowerShellLiteral $WatchdogScript) -Port $Port -InitialDelaySeconds $StartupDelaySeconds -MonitorIntervalSeconds $MonitorIntervalSeconds
"@
Set-Content -LiteralPath $TaskPowerShellLauncher -Value $taskLauncherScript -Encoding ASCII
$serverScript = Join-Path $Root "Start-AirbnbLivretServer.ps1"
$node = (Get-Command node -ErrorAction Stop).Source
$taskEnsureScript = @"
`$ErrorActionPreference = "Stop"
& $(Quote-PowerShellLiteral $serverScript) -Port $Port
"@
Set-Content -LiteralPath $TaskEnsureLauncher -Value $taskEnsureScript -Encoding ASCII
$taskEnsureCmdContent = @"
@echo off
echo %DATE% %TIME% Ensure-AirbnbLivretServer start >> "%~dp0ensure.out.log"
"$node" "%~dp0Ensure-AirbnbLivretServer.js" >> "%~dp0ensure.out.log" 2>> "%~dp0ensure.err.log"
echo %DATE% %TIME% Ensure-AirbnbLivretServer exit %ERRORLEVEL% >> "%~dp0ensure.out.log"
exit /b 0
"@
Set-Content -LiteralPath $TaskEnsureCmd -Value $taskEnsureCmdContent -Encoding ASCII
$startupCmdContent = @"
@echo off
timeout /t 10 /nobreak >nul
powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "$serverScript" -Port 4174
exit /b 0
"@
Set-Content -LiteralPath $StartupCmd -Value $startupCmdContent -Encoding ASCII
$serverJs = Join-Path $Root "server.js"
$runtimeJs = $TaskLauncherDir -replace "\\", "\\"
$serverJsEscaped = $serverJs -replace "\\", "\\"
$rootEscaped = $Root -replace "\\", "\\"
$taskEnsureJsContent = @"
"use strict";
const net = require("node:net");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const port = 4174;
const host = "127.0.0.1";
const nodePath = process.execPath;
const serverPath = "$serverJsEscaped";
const projectRoot = "$rootEscaped";
const runtimeDir = "$runtimeJs";
const logPath = path.join(runtimeDir, "ensure-js.log");

function log(message) {
  try {
    fs.mkdirSync(runtimeDir, { recursive: true });
    fs.appendFileSync(logPath, "[" + new Date().toISOString() + "] " + message + "\n");
  } catch {}
}

function isOpen() {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });
    socket.setTimeout(2000);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(false));
  });
}

(async () => {
  if (await isOpen()) {
    log("port 4174 already open");
    process.exit(0);
  }

  const child = spawn(nodePath, [serverPath, "--port=4174"], {
    cwd: projectRoot,
    detached: true,
    stdio: "ignore",
    env: { ...process.env, PORT: "4174", AIRBNB_LIVRET_RUNTIME_DIR: runtimeDir }
  });
  child.unref();
  log("started server pid=" + child.pid);
  process.exit(0);
})().catch((error) => {
  log("error: " + (error && error.stack ? error.stack : error));
  process.exit(0);
});
"@
Set-Content -LiteralPath $TaskEnsureJs -Value $taskEnsureJsContent -Encoding ASCII

$taskCommand = "wscript.exe `"$TaskLauncher`""
& schtasks.exe /Create /TN $TaskName /SC MINUTE /MO $TaskRepeatMinutes /TR $taskCommand /F | Out-Host
if ($LASTEXITCODE -ne 0) {
  throw "Failed to create scheduled task: $TaskName"
}

try {
  foreach ($scheduledTaskName in @($TaskName)) {
    $task = Get-ScheduledTask -TaskName $scheduledTaskName
    $task.Settings.DisallowStartIfOnBatteries = $false
    $task.Settings.StopIfGoingOnBatteries = $false
    $task.Settings.Hidden = $true
    $task.Settings.MultipleInstances = "IgnoreNew"
    $task.Settings.ExecutionTimeLimit = "PT0S"
    Set-ScheduledTask -InputObject $task | Out-Null
  }
} catch {
  Write-Warning "Scheduled task was created, but power/hidden settings could not be adjusted: $($_.Exception.Message)"
}

& schtasks.exe /Run /TN $TaskName | Out-Host
if ($LASTEXITCODE -ne 0) {
  throw "Failed to start scheduled task: $TaskName"
}

Write-Host "Startup launcher installed: $Launcher"
Write-Host "Task launcher installed: $TaskLauncher"
Write-Host "Task PowerShell launcher installed: $TaskPowerShellLauncher"
Write-Host "Task ensure launcher installed: $TaskEnsureLauncher"
Write-Host "Task ensure command installed: $TaskEnsureCmd"
Write-Host "Task ensure JS installed: $TaskEnsureJs"
Write-Host "Scheduled task installed: $TaskName, every $TaskRepeatMinutes minute(s)"
Write-Host "Watchdog target: http://127.0.0.1:$Port/"

