export default class Storage {
  constructor(name) {
    this.key = name;
    this._initStorageObj();
  }

  _initStorageObj() {
    this._storageObj = this.getObj();
  }

  getObj() {
    return JSON.parse(window.sessionStorage.getItem(this.key) || '{}');
  }

  setItem(key, value) {
    this._storageObj[key] = value;
    window.sessionStorage.setItem([this.key], JSON.stringify(this._storageObj));
  }

  clearStore() {
    this._storageObj = {};
    window.sessionStorage.setItem([this.key], JSON.stringify(this._storageObj));
  }
}
