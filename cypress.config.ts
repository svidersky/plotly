import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 5000,
  viewportWidth: 1536,
  viewportHeight: 960,
  video: true,
  videoCompression: false,
  trashAssetsBeforeRuns: true,
  chromeWebSecurity: false,
  retries: {
    runMode: 0, // Do not retry on CLI/CI in order to spot flakiness
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://www.cypress.io',
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
    experimentalRunAllSpecs: true,
  },
  blockHosts: ['*.google-analytics.com', '*.googletagmanager.com', '*.osano.com'],
});
