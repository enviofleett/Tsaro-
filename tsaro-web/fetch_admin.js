const http = require('http');

http.get('http://127.0.0.1:3000/admin', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log(`BODY LENGTH: ${body.length}`);
    if (body.includes('Command Center')) console.log('Contains: Command Center');
    if (body.includes('login')) console.log('Contains: login');
    if (body.includes('Strategy that survives')) console.log('Contains: Homepage');
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
