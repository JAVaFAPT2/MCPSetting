# MCP Servers for Claude AI

A collection of Model Context Protocol (MCP) servers deployed on Railway for use with Claude AI.

## 🚀 Services Included

- **Sequential Thinking** - Advanced reasoning capabilities
- **Puppeteer** - Web automation and scraping
- **Memory Bank** - Persistent memory storage
- **Playwright** - Browser automation
- **GitHub** - Repository management and code analysis
- **Knowledge Graph** - Memory and knowledge management
- **MCP Compass** - Navigation and exploration tools

## 🛠️ Local Development

### Prerequisites
- Node.js 20+
- Docker (optional)

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your environment variables:
   ```env
   GITHUB_TOKEN=your_github_token_here
   ```
4. Start the servers:
   ```bash
   npm start
   ```

### Docker
```bash
docker build -t mcp-servers .
docker run -p 3000:3000 -e GITHUB_TOKEN=your_token mcp-servers
```

## 🌐 Railway Deployment

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Make sure all files are committed:
   - `package.json`
   - `index.js`
   - `Dockerfile`
   - `railway.json`
   - `.dockerignore`

### Step 2: Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign in with your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect the Node.js project and deploy

### Step 3: Configure Environment Variables
In your Railway project dashboard:
1. Go to the "Variables" tab
2. Add your environment variables:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   ```

### Step 4: Get Your Deployment URL
1. Go to the "Settings" tab
2. Copy your custom domain or use the Railway-provided URL
3. Your MCP servers will be available at: `https://your-app.railway.app`

## 📊 Health Check

Check if your servers are running:
```
GET https://your-app.railway.app/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": [
    "sequential-thinking",
    "puppeteer",
    "memory-bank",
    "playwright",
    "github",
    "knowledge-graph",
    "mcp-compass"
  ]
}
```

## 🔧 Configuration

### Environment Variables
- `GITHUB_TOKEN` - GitHub Personal Access Token for GitHub MCP server
- `MEMORY_BANK_ROOT` - Directory for memory bank storage (default: `/tmp/memory-bank`)
- `PORT` - Port for the main server (Railway sets this automatically)

### MCP Server Ports
Each MCP server runs on its own port internally:
- Sequential Thinking: 3001
- Puppeteer: 3002
- Memory Bank: 3003
- Playwright: 3004
- GitHub: 3005
- Knowledge Graph: 3006
- MCP Compass: 3007

## 🐛 Troubleshooting

### Common Issues

1. **Servers not starting**: Check Railway logs in the dashboard
2. **GitHub API errors**: Verify your `GITHUB_TOKEN` is valid
3. **Memory issues**: Railway provides limited memory, consider upgrading your plan
4. **Port conflicts**: Railway handles port mapping automatically

### Logs
View logs in Railway dashboard:
1. Go to your project
2. Click on the deployment
3. Check the "Logs" tab for any errors

## 📝 Usage with Claude AI

Once deployed, you can use these MCP servers with Claude AI by configuring your MCP client to connect to the Railway deployment URL.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details 