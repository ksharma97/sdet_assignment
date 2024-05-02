const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 25000,
    chromeWebSecurity: false,
    keyStrokeDelay: 120,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: ["cypress\\e2e\\*.js"],
    supportFile: "cypress\\support\\e2e.js",
  },
});
