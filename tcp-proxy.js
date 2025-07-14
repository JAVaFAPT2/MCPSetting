const net = require('net');
const fs = require('fs-extra');
const path = require('path');

class TCPProxy {
  constructor() {
    this.proxies = new Map();
    this.configPath = './proxy-config.json';
    this.loadConfig();
  }

  // Load proxy configuration from file
  async loadConfig() {
    try {
      if (await fs.pathExists(this.configPath)) {
        const config = await fs.readJson(this.configPath);
        this.proxies = new Map(Object.entries(config));
        console.log(`✅ Loaded ${this.proxies.size} proxy configurations`);
      } else {
        // Create default config
        const defaultConfig = {
          '3001': { target: 'localhost:3001', description: 'Sequential Thinking Proxy' },
          '3002': { target: 'localhost:3002', description: 'Puppeteer Proxy' },
          '3003': { target: 'localhost:3003', description: 'Memory Bank Proxy' },
          '3004': { target: 'localhost:3004', description: 'Playwright Proxy' },
          '3005': { target: 'localhost:3005', description: 'GitHub Proxy' },
          '3006': { target: 'localhost:3006', description: 'Knowledge Graph Proxy' },
          '3007': { target: 'localhost:3007', description: 'MCP Compass Proxy' }
        };
        await fs.writeJson(this.configPath, defaultConfig, { spaces: 2 });
        this.proxies = new Map(Object.entries(defaultConfig));
        console.log('✅ Created default proxy configuration');
      }
    } catch (error) {
      console.error('❌ Error loading proxy config:', error);
    }
  }

  // Save proxy configuration to file
  async saveConfig() {
    try {
      const config = Object.fromEntries(this.proxies);
      await fs.writeJson(this.configPath, config, { spaces: 2 });
      console.log('✅ Proxy configuration saved');
    } catch (error) {
      console.error('❌ Error saving proxy config:', error);
    }
  }

  // Add a new proxy
  addProxy(port, target, description = '') {
    this.proxies.set(port.toString(), { target, description });
    this.saveConfig();
    console.log(`✅ Added proxy: ${port} -> ${target}`);
  }

  // Remove a proxy
  removeProxy(port) {
    const removed = this.proxies.delete(port.toString());
    if (removed) {
      this.saveConfig();
      console.log(`✅ Removed proxy: ${port}`);
    }
    return removed;
  }

  // Get all proxy configurations
  getProxies() {
    return Object.fromEntries(this.proxies);
  }

  // Start all configured proxies
  startProxies() {
    console.log('🚀 Starting TCP Proxies...');
    
    this.proxies.forEach((config, port) => {
      this.startProxy(parseInt(port), config.target, config.description);
    });
  }

  // Start a single proxy
  startProxy(port, target, description = '') {
    const server = net.createServer((clientSocket) => {
      console.log(`[TCP-${port}] Client connected from ${clientSocket.remoteAddress}:${clientSocket.remotePort}`);
      
      const [targetHost, targetPort] = target.split(':');
      const targetSocket = new net.Socket();

      targetSocket.connect(parseInt(targetPort), targetHost, () => {
        console.log(`[TCP-${port}] Connected to target ${target}`);
        clientSocket.pipe(targetSocket);
        targetSocket.pipe(clientSocket);
      });

      targetSocket.on('error', (err) => {
        console.error(`[TCP-${port}] Target connection error:`, err.message);
        clientSocket.end();
      });

      clientSocket.on('error', (err) => {
        console.error(`[TCP-${port}] Client connection error:`, err.message);
        targetSocket.end();
      });

      clientSocket.on('close', () => {
        console.log(`[TCP-${port}] Client disconnected`);
        targetSocket.end();
      });

      targetSocket.on('close', () => {
        console.log(`[TCP-${port}] Target disconnected`);
        clientSocket.end();
      });
    });

    server.listen(port, () => {
      console.log(`✅ TCP Proxy ${port} -> ${target} (${description})`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️  Port ${port} is already in use, skipping proxy`);
      } else {
        console.error(`❌ TCP Proxy ${port} error:`, err.message);
      }
    });

    return server;
  }

  // Get proxy status
  getStatus() {
    const status = {};
    this.proxies.forEach((config, port) => {
      status[port] = {
        target: config.target,
        description: config.description,
        status: 'configured'
      };
    });
    return status;
  }
}

module.exports = TCPProxy; 