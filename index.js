const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
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

// Mock MCP server endpoints
app.get('/sequential-thinking', (req, res) => {
  res.json({
    service: 'sequential-thinking',
    status: 'running',
    description: 'Advanced reasoning capabilities'
  });
});

app.get('/puppeteer', (req, res) => {
  res.json({
    service: 'puppeteer',
    status: 'running',
    description: 'Web automation and scraping'
  });
});

app.get('/memory-bank', (req, res) => {
  res.json({
    service: 'memory-bank',
    status: 'running',
    description: 'Persistent memory storage'
  });
});

app.get('/playwright', (req, res) => {
  res.json({
    service: 'playwright',
    status: 'running',
    description: 'Browser automation'
  });
});

app.get('/github', (req, res) => {
  res.json({
    service: 'github',
    status: 'running',
    description: 'Repository management and code analysis'
  });
});

app.get('/knowledge-graph', (req, res) => {
  res.json({
    service: 'knowledge-graph',
    status: 'running',
    description: 'Memory and knowledge management'
  });
});

app.get('/mcp-compass', (req, res) => {
  res.json({
    service: 'mcp-compass',
    status: 'running',
    description: 'Navigation and exploration tools'
  });
});

// Create necessary directories
const createDirectories = async () => {
  try {
    await fs.ensureDir('/tmp/memory-bank');
    await fs.ensureDir('./logs');
    console.log('✅ Directories created successfully');
  } catch (error) {
    console.error('❌ Error creating directories:', error);
  }
};

// Initialize the application
const initialize = async () => {
  console.log('🚀 Initializing MCP Servers...');
  await createDirectories();
  
  // Start the main server
  app.listen(PORT, () => {
    console.log(`🚀 MCP Servers running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Services available at: http://localhost:${PORT}`);
    console.log('');
    console.log('📋 Available Services:');
    console.log('  • Sequential Thinking: /sequential-thinking');
    console.log('  • Puppeteer: /puppeteer');
    console.log('  • Memory Bank: /memory-bank');
    console.log('  • Playwright: /playwright');
    console.log('  • GitHub: /github');
    console.log('  • Knowledge Graph: /knowledge-graph');
    console.log('  • MCP Compass: /mcp-compass');
  });
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

// Start the application
initialize().catch(console.error); 