import http from 'http';
import dns from 'dns';
const hostname = '127.0.0.1';
const port = 3000;
const domainName = 'SOLaden-web-Tbs1.de';
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`DNS Server is running at ${domainName}\n`);
});
dns.lookup(domainName, (err, addresses, family) => {
  console.log('addresses:', addresses);
  console.log('family:', family);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});