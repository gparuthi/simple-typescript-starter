import * as http2 from 'http2';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

async function handleRequest(
  req: http2.Http2ServerRequest,
  res: http2.Http2ServerResponse,
): Promise<void> {
  res.write('hahaha');
  res.statusCode = 200;
  res.end();
}

async function startServer() {
  const [key, cert] = await Promise.all([
    readFile('key.pem'),
    readFile('certificate.pem'),
  ]);

  const server = http2.createSecureServer({ key, cert }).listen(8080, () => {
    console.log('Server started');
  });

  server.on('request', handleRequest);

  server.on('error', err => console.error(err));
}

startServer();
