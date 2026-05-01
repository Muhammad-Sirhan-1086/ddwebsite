@echo off
setlocal
cd /d "%~dp0"

echo Starting Digital Dizzles portfolio...
echo.
echo This will open http://127.0.0.1:4173/index.html in your browser.
echo Keep the small server window open while viewing the portfolio.
echo.

start "Digital Dizzles Portfolio Server" /min python -m http.server 4173 --bind 127.0.0.1
timeout /t 2 >nul
start "" "http://127.0.0.1:4173/index.html"

echo Portfolio launched.
endlocal
