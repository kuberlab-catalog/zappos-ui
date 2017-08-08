const fs = require('fs');
const restify = require('restify');

const request = require('request');

const API_URL = process.env.API_URL;
const IMAGES_PATH = process.env.IMAGES_PATH;

const IMG_PATH = '/api/v1/proxy/namespaces/zappos-ui/services/controller:80';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const server = restify.createServer();

server
  .use(restify.plugins.bodyParser({
    mapFiles: true
  }))
  .use(restify.plugins.queryParser());

function searchByFile(res, file) {
  return request.post({url: API_URL, formData: {file: file}},
    function(err, httpResponse, body) {
      if (err) {
        return console.log(err);
      }

      let data = body.match(/\/data\/.*\.jpg/g);

      if (data && data.length) {
        data = data.map((value) => `${IMG_PATH}${value}`);
      }

      return res.end(JSON.stringify(data));
    });
}

const readDirectory = (path, criteria) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      const filtering = files.filter((file) => !file.match(/^\./));
      resolve(filtering);
    });
  })
};

async function readRandomFile(path) {
  const files = await readDirectory(path);
  const randomNumber = Math.floor(Math.random() * files.length);
  return files[randomNumber];
}

async function find5RandomFiles() {
  let files = [];

  for (let i = 0; i < 5; ++i) {
    let file;
    let path = IMAGES_PATH;

    while (!file) {
      let foundFile = await readRandomFile(path);

      path = `${path}/${foundFile}`;
      if (!fs.lstatSync(path).isDirectory()) {
        file = path;
        files.push(file);
      }
    }
  }

  return files;
}

server.get('/api/getRandom', async (req, res) => {
  const files = await find5RandomFiles();
  const result = files.map((value) => value.replace(IMAGES_PATH, '/api/get?file='));

  res.json(result);
});

server.get('/api/get', (req, res) => {
  const safeFilePath = req.query.file.replace('../', '/');

  fs.createReadStream(`${IMAGES_PATH}${safeFilePath}`).pipe(res);
});

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
