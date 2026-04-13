const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      windowSize: '1920x1080',
      browser: 'chromium',
      userDataDir:
      url: 'http://localhost',
      show: true,
      channel: 'chrome',
      ignoreHTTPSErrors: true,
      waitForNavigation: "load",
      getPageTimeout: 60000,
      restart: true,
      keepCookies: false,
      keepBrowserState: false,
    }
  },
  include: {
    I: './steps_file.js'
  },
  plugins: {
    htmlReporter: {
      enabled: true
    }
  },
  name: 'Projeto'
}
