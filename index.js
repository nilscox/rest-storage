const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const yargs = require('yargs');

const pkg = require('./package');
const memoryStorage = require('./storages/memory');
const fileStorage = require('./storages/file');

const args = yargs
  .option('filename', { alias: 'f', default: 'storage.json' })
  .option('memory',   { alias: 'm', default: false })
  .option('port',     { alias: 'p', default: 9999 })
  .option('verbose',  { alias: 'v', default: false })
  .argv;

if (args.verbose) {
  console.log(`RestStorage v${pkg.version}`);
  console.log('-> verbose :', args.verbose);
  console.log('-> port    :', args.port);

  if (args.memory)
    console.log('-> memory  :', args.memory);
  else if (args.filename) {
    const filename = path.resolve(args.filename);

    console.log('-> filename:', path.basename(filename));
    console.log('-> filepath:', path.dirname(filename));
  }
}

const storage = (({ memory, filename }) => {
  if (memory)
    return memoryStorage({});
  else if (filename)
    return fileStorage(path.resolve(filename));
})(args);

const app = express();

app.use(bodyParser.json({ limit: '8mb' }));

app.use((req, res, next) => {
  req.storage = storage;
  next();
});

app.get('/:item', (req, res) => {
  const item = req.params['item'];
  const value = req.storage.getItem(item);

  if (args.verbose)
    console.log(`GET ${item}`);

  if (!value)
    return res.status(404).end();

  res.json(value);
});

app.post('/:item', (req, res) => {
  const item = req.params['item'];
  const value = req.body;

  if (args.verbose)
    console.log(`SET ${item}`);

  if (!value)
    return res.status(400).end();

  req.storage.setItem(item, value);

  res.end();
});

app.delete('/:item', (req, res, next) => {
  const item = req.params['item'];

  if (args.verbose)
    console.log(`REM ${item}`);

  if (!req.storage.removeItem(item))
    return res.status(404).end();

  res.end();
});

app.use((err, req, res, next) => {
  console.log('ERR ', err);
  res.status(500).end();
});

const PORT = process.env.PORT || args.port;

console.log(`server started on port ${PORT}`);
app.listen(PORT);
