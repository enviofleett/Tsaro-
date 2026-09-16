const http = require('http');

function testRoute(path) {
  http.get('http://127.0.0.1:3000' + path, (res) => {
    console.log(`${path} -> STATUS: ${res.statusCode} | LOCATION: ${res.headers.location}`);
  }).on('error', (e) => {
    console.error(`${path} error: ${e.message}`);
  });
}

testRoute('/');
testRoute('/admin');
testRoute('/login');
