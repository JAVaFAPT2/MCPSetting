const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: [
      'sequential-thinking',
      'puppeteer',
      'memory-bank',
      'playwright',
      'github',
      'knowledge-graph',
      'mcp-compass'
    ]
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'MCP Servers for Claude AI',
    version: '1.0.0',
    services: {
      'sequential-thinking': '/sequential-thinking',
      'puppeteer': '/puppeteer',
      'memory-bank': '/memory-bank',
      'playwright': '/playwright',
      'github': '/github',
      'knowledge-graph': '/knowledge-graph',
      'mcp-compass': '/mcp-compass'
    },
    health: '/health'
  });
});

// Start MCP servers
const startMCPServer = (name, command, args = [], env = {}) => {
  console.log(`Starting ${name} server...`);
  
  const child = spawn(command, args, {
    stdio: 'pipe',
    env: { ...process.env, ...env }
  });

  child.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`[${name}] ERROR: ${data.toString().trim()}`);
  });

  child.on('close', (code) => {
    console.log(`[${name}] Process exited with code ${code}`);
  });

  return child;
};

// Start all MCP servers
const servers = [];

// Sequential Thinking Server
servers.push(startMCPServer('sequential-thinking', 'npx', ['@modelcontext/protocol-server-sequentialthinking']));

// Puppeteer Server
servers.push(startMCPServer('puppeteer', 'npx', ['@modelcontext/protocol-server-puppeteer']));

// Memory Bank Server
servers.push(startMCPServer('memory-bank', 'npx', ['@alioshr/memory-bank-mcp'], {
  MEMORY_BANK_ROOT: '/tmp/memory-bank'
}));

// Playwright Server
servers.push(startMCPServer('playwright', 'npx', ['@modelcontext/protocol-server-playwright']));

// GitHub Server
if (process.env.GITHUB_TOKEN) {
  servers.push(startMCPServer('github', 'npx', ['@modelcontext/protocol-server-github'], {
    GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_TOKEN
  }));
}

// Knowledge Graph Server
servers.push(startMCPServer('knowledge-graph', 'npx', ['@modelcontext/protocol-server-memory']));

// MCP Compass Server
servers.push(startMCPServer('mcp-compass', 'npx', ['@liuyoshio/mcp-compass']));

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  servers.forEach(server => {
    if (server && !server.killed) {
      server.kill('SIGTERM');
    }
  });
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  servers.forEach(server => {
    if (server && !server.killed) {
      server.kill('SIGINT');
    }
  });
  process.exit(0);
});

// Start the main server
app.listen(PORT, () => {
  console.log(`🚀 MCP Servers running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Services available at: http://localhost:${PORT}`);
}); 