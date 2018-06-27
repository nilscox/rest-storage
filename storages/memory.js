const getItem = (storage, key) => {
  return storage[key];
};

const setItem = (storage, key, value) => {
  storage[key] = value;
};

const removeItem = (storage, key) => {
  if (!storage[key])
    return false;

  delete storage[key];

  return true;
};

module.exports = (storage) => ({
  getItem: getItem.bind(null, storage),
  setItem: setItem.bind(null, storage),
  removeItem: removeItem.bind(null, storage),
});
