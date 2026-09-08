@echo off
set "ROOT=%~dp0"
start "" powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%ROOT%Start-AirbnbLivretWatchdog.ps1" -Port 4174 -InitialDelaySeconds 0
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:4174/
