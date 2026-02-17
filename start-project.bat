@echo off
echo Iniciando servidores...
echo.

start "Backend - SPS Server" cmd /k "cd /d %~dp0test-sps-server && npm run dev"
timeout /t 2 /nobreak >nul
start "Frontend - SPS React" cmd /k "cd /d %~dp0test-sps-react && npm start"

echo.
echo Servidores iniciados!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:3001
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul