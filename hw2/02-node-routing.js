const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = {
  '/welcome': (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Welcome to the wonderland! 🐰</h1>');
    res.end();
  },

  '/redirect': (req, res) => {
    res.writeHead(302, {Location: '/redirected'});
    res.end();
  },

  '/redirected': (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>🐇🌀🌀🌀You have been successfully redirected!</h1>');
    res.end();
  },

  '/cache': (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'max-age=86400', // 1 day in seconds
    });
    res.write('<h1>🏴‍☠️This resource was cached.</h1>');
    res.end();
  },

  '/cookie': (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Set-Cookie': 'hello=world',
    });
    res.write('🍪cookies… yummm');
    res.end();
  }
};

// Default handler for 404 responses
const notFoundHandler = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>404 - Page Not Found🙈</h1>');
  res.end();
};

const server = http.createServer((req, res) => {
  // Extract pathname
  const path = req.url;

  // Get the appropriate handler or use notFoundHandler if route doesn't exist
  const handler = routes[path] || notFoundHandler;

  // Execute the handler
  handler(req, res);
});

server.listen(port, () => {
  console.log(`🏃‍♀️💨Server running at http://localhost:${port}`);
});
