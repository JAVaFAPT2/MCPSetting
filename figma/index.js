const http = require('http');
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from figma');
}).listen(port, () => {
  console.log('figma running on port', port);
});
