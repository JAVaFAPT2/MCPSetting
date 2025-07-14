const http = require('http');
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from apidog');
}).listen(port, () => {
  console.log('apidog running on port', port);
});
