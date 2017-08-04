const fs = require('fs');
const restify = require('restify');

const request = require('request');

const API_URL = 'https://b230e127-f938-4e94-99c9-c3e9f6a26fcf.dev.kuberlab.io/';
const IMG_PATH = '/api/v1/proxy/namespaces/zappos-ui/services/controller:80';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = restify.createServer();

server.use(restify.plugins.bodyParser({
  mapFiles: true
}));

function searchByFile(res, file) {
  return request.post({url: API_URL, formData: {file: file}},
    function(err, httpResponse, body) {
      if (err) {
        return console.log(err);
      }

      let data = body.match(/\/data\/.*\.jpg/g);

      if (data && data.length) {
        data = data.map((value) => `${API_URL}${IMG_PATH}${value}`);
      }

      return res.end(JSON.stringify(data));
    });
}

server.post('/api/upload', (req, res) => {
  if (req.files) {
    return searchByFile(res, fs.createReadStream(req.files.file.path));
  }

  res.writeHead(500);
  res.end(JSON.stringify({error: 'Please upload a file'}));
});

server.post('/api/searchBy', (req, res) => {
  if (req.body.fileName) {

    return request.get(req.body.fileName, {encoding: null}, (err, httpResponse, body) => {
      if (err) {
        res.writeHead(500);
        res.end();

        return console.log(err);
      }

      fs.writeFileSync('/tmp/123.jpg', body);

      return searchByFile(res, fs.createReadStream('/tmp/123.jpg'));
    });
  }

  res.writeHead(500);
  res.end(JSON.stringify({error: 'Please upload a file'}));
});

server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: '../ui/dist',
  default: 'index.html'
}));

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', function(request, response, route, error) {
  response.send(500);
  console.error(error.stack);
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
