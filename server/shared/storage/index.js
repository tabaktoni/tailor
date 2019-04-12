'use strict';

const autobind = require('auto-bind');
const path = require('path');
const { validateConfig } = require('./validation');

const PROVIDER_CONFIG = Symbol('config');
const PROVIDER_TYPE = Symbol('type');

class Storage {
  constructor(config) {
    this.provider = Storage.createProvider(config);
    autobind(this, {
      exclude: [
        'config',
        'type',
        'serveHandler',
        'uploadHandler'
      ]
    });
  }

  get config() {
    return this.provider[PROVIDER_CONFIG];
  }

  get type() {
    return this.provider[PROVIDER_TYPE];
  }

  get serveHandler() {
    return this.provider.serveHandler;
  }

  get uploadHandler() {
    return this.provider.uploadHandler;
  }

  getFile(key, options = {}) {
    return this.provider.getFile(key, options);
  }

  saveFile(key, data, options = {}) {
    return this.provider.saveFile(key, data, options);
  }

  deleteFile(key, options = {}) {
    return this.provider.deleteFile(key, options);
  }

  listFiles(options = {}) {
    return this.provider.listFiles(options);
  }

  fileExists(key, options = {}) {
    return this.provider.fileExists(key, options);
  }

  getFileUrl(key, options = {}) {
    return this.provider.getFileUrl(key, options);
  }

  moveFile(key, newKey, options = {}) {
    return this.provider.moveFile(key, newKey, options);
  }

  copyFile(key, newKey, options = {}) {
    return this.provider.copyFile(key, newKey, options);
  }

  getUploadConfig() {
    return this.provider.getUploadConfig && this.provider.getUploadConfig();
  }

  static createProvider(options) {
    // Validate provider name.
    const providerName = options.provider;
    if (!options[providerName]) {
      throw new Error('Provider should be defined in config');
    }

    // Load provider module & create provider instance.
    const config = options[providerName];
    const Provider = loadProvider(providerName);
    const provider = Provider.create(validateConfig(config, Provider.schema));
    return Object.assign(provider, {
      [PROVIDER_CONFIG]: config,
      [PROVIDER_TYPE]: providerName
    });
  }
}

module.exports = config => new Storage(config);
module.exports.Storage = Storage;

function loadProvider(name) {
  try {
    return require(path.join(__dirname, './providers/', name));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') throw new Error('Unsupported provider');
    throw err;
  }
}
