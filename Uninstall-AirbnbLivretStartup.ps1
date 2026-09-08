param(
  [string]$TaskName = "AirbnbLivret4174Watchdog"
)

$ErrorActionPreference = "Stop"
$StartupDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Startup"
$Launcher = Join-Path $StartupDir "Livret_Airbnb_Watchdog_4174.vbs"
$StartupCmd = Join-Path $StartupDir "Livret_Airbnb_4174.cmd"
$LocalAppData = $env:LOCALAPPDATA
if (-not $LocalAppData -and $env:USERPROFILE) {
  $LocalAppData = Join-Path $env:USERPROFILE "AppData\Local"
}
$TaskLauncherDir = Join-Path $LocalAppData "AirbnbLivret-4174"
$TaskLaunchers = @(
  (Join-Path $TaskLauncherDir "Run-AirbnbLivretWatchdog.vbs"),
  (Join-Path $TaskLauncherDir "Run-AirbnbLivretWatchdog.ps1"),
  (Join-Path $TaskLauncherDir "Ensure-AirbnbLivretServer.ps1"),
  (Join-Path $TaskLauncherDir "Ensure-AirbnbLivretServer.cmd"),
  (Join-Path $TaskLauncherDir "Ensure-AirbnbLivretServer.js")
)

if (Test-Path -LiteralPath $Launcher) {
  Remove-Item -LiteralPath $Launcher -Force
  Write-Host "Removed startup launcher: $Launcher"
}
if (Test-Path -LiteralPath $StartupCmd) {
  Remove-Item -LiteralPath $StartupCmd -Force
  Write-Host "Removed startup launcher: $StartupCmd"
}

foreach ($taskLauncher in $TaskLaunchers) {
  if (Test-Path -LiteralPath $taskLauncher) {
    Remove-Item -LiteralPath $taskLauncher -Force
    Write-Host "Removed task launcher: $taskLauncher"
  }
}

foreach ($scheduledTaskName in @($TaskName, "AirbnbLivret4174AtLogon")) {
  & schtasks.exe /Delete /TN $scheduledTaskName /F | Out-Host
}
