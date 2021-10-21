const http = require('http');
const etl = require('./etl');


const requestListener = async function (req, res) {
  try {
    let data = await etl.count().catch((err) => {throw err});
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({result: data}));
  } catch(err) {
    res.writeHead(500);
    res.end(err.toString());
  }
  
}

const server = http.createServer(requestListener);
server.listen(8080);


module.exports.server = server;