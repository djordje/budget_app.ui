import {
  writeApiTokenToLocalStorage,
  readApiTokenFromLocalStorage,
  removeApiTokenFromLocalStorage
} from './index';

afterEach(() => {
  window.localStorage.clear();
});

const response = { test: 1 };
const serialized = JSON.stringify(response);

describe('writeApiTokenToLocalStorage', () => {
  it('writes serialized object to local storage', () => {
    writeApiTokenToLocalStorage(response);
    expect(window.localStorage.getItem('apiToken')).toEqual(serialized);
  });
});

describe('readApiTokenFromLocalStorage', () => {
  it('reads and deserializes object from local storage', () => {
    window.localStorage.setItem('apiToken', serialized);
    expect(readApiTokenFromLocalStorage()).toEqual(response);
  });

  it('returns null unless string can be deserialized to JSON', () => {
    window.localStorage.setItem('apiToken', '[object Object]');
    expect(readApiTokenFromLocalStorage()).toBeNull();
  });
});

describe('removeApiTokenFromLocalStorage', () => {
  it('removes object from local storage', () => {
    window.localStorage.setItem('apiToken', serialized);
    removeApiTokenFromLocalStorage();
    expect(window.localStorage.getItem('apiToken')).toBeNull();
  });
});
