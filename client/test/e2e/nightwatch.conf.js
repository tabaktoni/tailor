require('babel-register')
const settings = require('../../../config/client/startup/settings');

// http://nightwatchjs.org/guide#settings-file
module.exports = {
  'src_folders': ['client/test/e2e/specs'],
  'output_folder': 'client/test/e2e/reports',
  'custom_assertions_path': ['client/test/e2e/custom-assertions'],

  'selenium': {
    'start_process': true,
    'server_path': 'node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.1.jar',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  'test_settings': {
    'default': {
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'silent': true,
      'globals': {
        'devServerURL': `http://localhost:${process.env.PORT || settings.client.PORT}`
      }
    },

    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'firefox': {
      'desiredCapabilities': {
        'browserName': 'firefox',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  }
}