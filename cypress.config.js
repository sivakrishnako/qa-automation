const { defineConfig } = require('cypress')
module.exports = defineConfig({
  projectId: '5qe1y2',
  chromeWebSecurity: false,
  video: false,
  env: {
  kioskURL: 'https://org1-kiosk.raintreeinc.com/?location=',
    //kioskURL: 'https://org1-kiosk.sqa.raintreeinc.com/?location=',
    myWait: 35000,
    elementTimeout: 2000,
    apiURL: 'https://rt-api-kiosk.dev.raintreeinc.com/api/',
    rtApiURL: 'https://kiosk.raintreeinc.com/dat/api/'
  },
  defaultCommandTimeout: 30000,
  e2e: {
    setupNodeEvents (on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.spec.js',
    experimentalSessionAndOrigin: true,
    baseUrl: 'https://org1-kiosk.raintreeinc.com/?location='
  }
})
