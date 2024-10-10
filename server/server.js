const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const PORT = 3000;

//Create a server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  //GET request processing
  if (req.method === 'GET' && pathname === '/quotes') {
    //Send HTML
    fs.readFile(path.join(__dirname, '..', 'client', 'example.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'GET' && pathname === '/style/style.css') {
        // Send CSS-
        fs.readFile(path.join(__dirname, '..', 'client','style', 'style.css'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
  } else if (req.method === 'GET' && pathname === '/app.js') {
    fs.readFile(path.join(__dirname, '..', 'client', 'app.js'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    })
  } else if (req.method === 'POST' && pathname === '/quotes') {
    //POST request processing
    let body = '';

    //Get data from the request body
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const jsonData = JSON.parse(body);
      console.log('Received data: ', jsonData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(jsonData));
    });
  } else {
    res.writeHead(404, { 'Content-Type': "text/plain" });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});