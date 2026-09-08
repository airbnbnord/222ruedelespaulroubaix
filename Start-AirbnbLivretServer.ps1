param(
  [int]$Port = 4174
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
$LogPath = Join-Path $RuntimeDir "server.log"

New-Item -ItemType Directory -Force -Path $RuntimeDir | Out-Null

function Write-ServerLog {
  param([string]$Message)
  try {
    "[$(Get-Date -Format s)] $Message" | Add-Content -LiteralPath $LogPath -Encoding UTF8
  } catch {
    # Logging must not block the local HTTP server.
  }
}

function Test-PortOpen {
  param([int]$CheckPort)
  try {
    $client = New-Object System.Net.Sockets.TcpClient
    $async = $client.BeginConnect("127.0.0.1", $CheckPort, $null, $null)
    $ok = $async.AsyncWaitHandle.WaitOne(750)
    if ($ok) { $client.EndConnect($async) }
    $client.Close()
    return $ok
  } catch {
    return $false
  }
}

if (Test-PortOpen -CheckPort $Port) {
  Write-ServerLog "Port $Port already open."
  exit 0
}

$node = (Get-Command node -ErrorAction SilentlyContinue).Source
if (-not $node) {
  throw "Node.js is required to serve the Airbnb welcome booklet with the Events Nearby API."
}

$serverPath = Join-Path $ProjectRoot "server.js"
if (-not (Test-Path -LiteralPath $serverPath)) {
  throw "server.js is required to serve the Airbnb welcome booklet with the Events Nearby API."
}

Write-ServerLog "Starting server on http://127.0.0.1:$Port/ from $ProjectRoot"
$ensureScript = Join-Path $RuntimeDir "Ensure-AirbnbLivretServer.js"
if (Test-Path -LiteralPath $ensureScript) {
  & $node $ensureScript
  exit 0
}

$nodeArguments = @("`"$serverPath`"", "--port=$Port")
Start-Process -FilePath $node -ArgumentList $nodeArguments -WorkingDirectory $ProjectRoot -WindowStyle Hidden | Out-Null
