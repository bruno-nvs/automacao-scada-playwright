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
      userDataDir: './perfil_robo_scada', // Pasta para armazenar o perfil do navegador (cookies, localStorage, etc.)
      url: 'http://localhost',
      show: true,
      channel: 'chrome',
      ignoreHTTPSErrors: true,
      waitForNavigation: "load",
      getPageTimeout: 60000, // Aumenta o tempo limite para 60 segundos (sistemas industriais precisam disso)
      restart: true, // Força o navegador a reiniciar do zero entre os testes
      keepCookies: false, // Garante que não salve cookies de uma sessão para outra
      keepBrowserState: false, // Garante que não salve o estado do navegador (como localStorage) de uma sessão para outra
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