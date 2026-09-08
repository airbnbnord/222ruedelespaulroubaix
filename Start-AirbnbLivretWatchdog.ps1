param(
  [int]$Port = 4174,
  [int]$InitialDelaySeconds = 25,
  [int]$RetryCount = 6,
  [int]$RetryDelaySeconds = 5,
  [int]$MonitorIntervalSeconds = 30
)

$ErrorActionPreference = "Stop"
$Port = 4174
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$LocalAppData = $env:LOCALAPPDATA
if (-not $LocalAppData -and $env:USERPROFILE) {
  $LocalAppData = Join-Path $env:USERPROFILE "AppData\Local"
}
if (-not $LocalAppData) {
  $LocalAppData = $ProjectRoot
}
$RuntimeDir = Join-Path $LocalAppData "AirbnbLivret-4174"
$LogPath = Join-Path $RuntimeDir "watchdog.log"
$ServerScript = Join-Path $ProjectRoot "Start-AirbnbLivretServer.ps1"
$MutexName = "Local\AirbnbLivretStartup-4174"

New-Item -ItemType Directory -Force -Path $RuntimeDir | Out-Null

$mutex = New-Object System.Threading.Mutex($false, $MutexName)
if (-not $mutex.WaitOne(0)) {
  "[$(Get-Date -Format s)] Startup check already running." | Add-Content -LiteralPath $LogPath -Encoding UTF8
  exit 0
}

function Write-WatchdogLog {
  param([string]$Message)
  try {
    "[$(Get-Date -Format s)] $Message" | Add-Content -LiteralPath $LogPath -Encoding UTF8
  } catch {
    # Logging must not prevent the local server from being relaunched.
  }
}

function Test-LivretHealthy {
  param([int]$CheckPort)
  try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:$CheckPort/" -UseBasicParsing -TimeoutSec 4
    return ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500)
  } catch {
    return $false
  }
}

try {
  Write-WatchdogLog "Watchdog scheduled for http://127.0.0.1:$Port/ after $InitialDelaySeconds seconds."
  if ($InitialDelaySeconds -gt 0) {
    Start-Sleep -Seconds $InitialDelaySeconds
  }

  while ($true) {
    $maxAttempts = $RetryCount
    if ($maxAttempts -lt 1) { $maxAttempts = 1 }
    for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
      if (Test-LivretHealthy -CheckPort $Port) {
        Write-WatchdogLog "Livret healthy on port $Port."
        break
      }

      Write-WatchdogLog "Livret unavailable at attempt $attempt/$maxAttempts. Launching server."
      Start-Process -FilePath "powershell.exe" -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-WindowStyle", "Hidden", "-File", $ServerScript, "-Port", [string]$Port) -WindowStyle Hidden | Out-Null
      Start-Sleep -Seconds $RetryDelaySeconds

      if (Test-LivretHealthy -CheckPort $Port) {
        Write-WatchdogLog "Livret healthy after attempt $attempt."
        break
      }
    }

    $sleepSeconds = $MonitorIntervalSeconds
    if ($sleepSeconds -lt 5) { $sleepSeconds = 5 }
    Start-Sleep -Seconds $sleepSeconds
  }
} finally {
  try { $mutex.ReleaseMutex() | Out-Null } catch {}
  $mutex.Dispose()
}
