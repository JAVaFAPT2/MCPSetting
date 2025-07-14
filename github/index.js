const http = require('http');
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello from github');
}).listen(port, () => {
  console.log('github running on port', port);
});
