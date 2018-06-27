const fs = require('fs');

const loadStorage = (filename) => {
  if (!fs.existsSync(filename))
    fs.writeFileSync(filename, JSON.stringify({}));

  return JSON.parse(fs.readFileSync(filename));
};

const saveStorage = (filename, obj) => {
  fs.writeFileSync(filename, JSON.stringify(obj));
};

const getItem = (filename, key) => {
  return loadStorage(filename)[key];
};

const setItem = (filename, key, value) => {
  const json = loadStorage(filename);

  json[key] = value;
  saveStorage(filename, json);
};

const removeItem = (filename, key) => {
  const json = loadStorage(filename);

  if (!json[key])
    return false;

  delete json[key];
  saveStorage(filename, json);

  return true;
};

module.exports = (filename) => ({
  getItem: getItem.bind(null, filename),
  setItem: setItem.bind(null, filename),
  removeItem: removeItem.bind(null, filename),
});
