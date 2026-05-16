require('dotenv').config();

Feature('SCADA - Monitoramento de Alarmes');

const loginSteps = require('./steps/login');
const NavigationSteps = require ('./steps/navigation')

  Scenario('Validar carregamento de alarmes do aerogerador AEG02', async ({ I }) => {
    I.amOnPage(process.env.URL_SISTEMA);
    I.waitForElement('iframe#mainframe', 20);
    I.switchTo('iframe#mainframe');

    // Login
    loginSteps.login(
    I,
    process.env.USUARIO_WEG,
    process.env.SENHA_WEG
);
    
    // Navegação
    NavigationSteps.acessarAerogerador(
    I,
    'Rio Grande DS',
    'Ibirapuita',
    'AEG02'
);

    // Aplicação possui atraso assíncrono no carregamento da aba de alarmes
    I.waitForClickable('Alarmes / registros', 10);
    I.see('Alarmes');

    // Evidência
    I.saveScreenshot(`alarmes_aeg02_${Date.now()}.png`);

    I.say('Fluxo crítico validado com sucesso');

}).tag('@smoke')

// Login inválido (sem senha)
Scenario('Falha de login, digitando apenas usuário', ({ I }) => {
    I.amOnPage(process.env.URL_SISTEMA);
    I.waitForElement('iframe#mainframe', 20);
    I.switchTo('iframe#mainframe');

    loginSteps.login(
    I,
    process.env.USUARIO_WEG,
    ''
);

    I.waitForText('Acessar falhou - nome de usuário/senha errada', 10);

    I.saveScreenshot('login_sem_senha.png');

}).tag('@negativo')

// Login inválido (sem usuário)
Scenario('Falha de login, digitando apenas senha', ({ I }) => {
    I.amOnPage(process.env.URL_SISTEMA);
    I.waitForElement('iframe#mainframe', 20);
    I.switchTo('iframe#mainframe');

    loginSteps.login(I,
        '',
        process.env.SENHA_WEG
    );

    I.waitForText('Acessar falhou - nome de usuário/senha errada', 10);

    I.saveScreenshot('login_sem_usuário.png');
    
}).tag('@negativo')