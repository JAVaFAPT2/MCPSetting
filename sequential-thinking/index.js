const http = require('http');
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from sequential-thinking');
}).listen(port, () => {
  console.log('sequential-thinking running on port', port);
});
