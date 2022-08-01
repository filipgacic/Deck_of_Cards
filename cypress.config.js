const { defineConfig } = require('cypress')

module.exports = {
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromewebsecurity: false,
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
