const localStorage = isLocalStorageNameSupported() ? window.localStorage : {
  getItem: () => { return null },
  setItem: (name, value) => {},
  removeItem: (name) => {}
};

function isLocalStorageNameSupported() {
  let testKey = 'test';
  let storage = window.localStorage;

  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch(e) {
    return false;
  }
}

export function writeApiTokenToLocalStorage(body) {
  localStorage.setItem('apiToken', JSON.stringify(body));
}

export function readApiTokenFromLocalStorage() {
  const apiToken = localStorage.getItem('apiToken');
  if (apiToken) {
    try {
      return JSON.parse(apiToken);
    }
    catch (e) {
      return null;
    }
  }
}

export function removeApiTokenFromLocalStorage() {
  localStorage.removeItem('apiToken');
}
