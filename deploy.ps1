# MCP Servers Railway Deployment Script for Windows
# This script helps you deploy your MCP servers to Railway

Write-Host "🚀 MCP Servers Railway Deployment Script" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Check if Git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if Node.js is installed
try {
    node --version | Out-Null
    Write-Host "✅ Node.js is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if Railway CLI is installed
try {
    railway --version | Out-Null
    Write-Host "✅ Railway CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Railway CLI is not installed. Installing now..." -ForegroundColor Yellow
    npm install -g @railway/cli
    Write-Host "✅ Railway CLI installed" -ForegroundColor Green
}

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Host "⚠️  Not in a Git repository. Initializing..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: MCP Servers setup"
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

# Check if we have a remote repository
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "⚠️  No remote repository configured." -ForegroundColor Yellow
    Write-Host "Please create a GitHub repository and add it as origin:" -ForegroundColor Cyan
    Write-Host "git remote add origin https://github.com/yourusername/your-repo-name.git" -ForegroundColor White
    Write-Host "Then run this script again." -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Remote repository: $remoteUrl" -ForegroundColor Green

# Check if all required files exist
$requiredFiles = @("package.json", "index.js", "Dockerfile", "railway.json", ".dockerignore")
$missingFiles = @()

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ Missing required files: $($missingFiles -join ', ')" -ForegroundColor Red
    exit 1
}

Write-Host "✅ All required files present" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Commit changes
Write-Host "📝 Committing changes..." -ForegroundColor Cyan
git add .
git commit -m "Deploy: MCP Servers ready for Railway"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to commit changes" -ForegroundColor Red
    exit 1
}

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Code pushed to GitHub" -ForegroundColor Green

# Deploy to Railway
Write-Host "🚀 Deploying to Railway..." -ForegroundColor Cyan
Write-Host "This will open your browser to Railway. Please follow the prompts:" -ForegroundColor Yellow
Write-Host "1. Sign in to Railway" -ForegroundColor White
Write-Host "2. Create a new project" -ForegroundColor White
Write-Host "3. Select 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host "4. Select your repository" -ForegroundColor White
Write-Host "5. Add environment variables (GITHUB_TOKEN)" -ForegroundColor White

# Open Railway in browser
Start-Process "https://railway.app"

Write-Host ""
Write-Host "🎉 Deployment process started!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Complete the Railway setup in your browser" -ForegroundColor White
Write-Host "2. Add your GITHUB_TOKEN environment variable" -ForegroundColor White
Write-Host "3. Wait for deployment to complete" -ForegroundColor White
Write-Host "4. Get your deployment URL from Railway dashboard" -ForegroundColor White
Write-Host ""
Write-Host "Your MCP servers will be available at: https://your-app.railway.app" -ForegroundColor Yellow
Write-Host "Health check: https://your-app.railway.app/health" -ForegroundColor Yellow 