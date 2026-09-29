$EnvironmentId = "8df9dcac-cbda-e603-9ebc-d833fe1b181a"
$AppName = "Cyber360 Security Findings Management Platform"
$ProjectPath = "D:\Cyber360 PowerCodeApps\my-app"

Write-Host "PowerApps Code App Setup" -ForegroundColor Cyan

Write-Host "`n[1/7] Checking Power Apps CLI..." -ForegroundColor Cyan
pac code --version
Write-Host "OK" -ForegroundColor Green

Write-Host "`n[2/7] Authenticating..." -ForegroundColor Cyan
Read-Host "Press Enter to continue"
pac auth create --url https://login.microsoftonline.com

Write-Host "`n[3/7] Listing environments..." -ForegroundColor Cyan
pac env list

Write-Host "`n[4/7] Selecting environment..." -ForegroundColor Cyan
pac env select --environment $EnvironmentId

Write-Host "`n[5/7] Setting project path..." -ForegroundColor Cyan
Set-Location $ProjectPath
Write-Host "OK" -ForegroundColor Green

Write-Host "`n[6/7] Initializing Power Apps Code App..." -ForegroundColor Cyan
pac code init --displayname $AppName

Write-Host "`n[7/7] Installing and building..." -ForegroundColor Cyan
npm install
npm run build

Write-Host "`nDeploying to Power Apps? (y/n)" -ForegroundColor Yellow
$confirm = Read-Host

if ($confirm -eq "y")
{
    pac code push
    Write-Host "Deployment successful!" -ForegroundColor Green
}
else
{
    Write-Host "Deployment cancelled" -ForegroundColor Yellow
}

Write-Host "Done!" -ForegroundColor Cyan
