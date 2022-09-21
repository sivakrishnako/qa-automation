const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "5qe1y2",
  chromeWebSecurity: false,
  video: false,
  env: {
    kioskURL: "https://org1-kiosk.raintreeinc.com/?location=",
    myWait: 120000,
    elementTimeout: 2000,
    apiURL: "http://rtkioskadminsapi-test.us-east-2.elasticbeanstalk.com/",
    rtApiURL: "https://kiosk.raintreeinc.com/dat/api/",
    pmURL: "https://lpbkunky99.execute-api.us-east-1.amazonaws.com/Prod/api/",
  },
  defaultCommandTimeout: 30000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    specPattern: "cypress/e2e/**/*.spec.js",
    baseUrl: "https://org1-kiosk.raintreeinc.com/?location=ZZPOC",
  },
});
