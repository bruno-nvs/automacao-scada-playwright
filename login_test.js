require('dotenv').config();

Feature('SCADA - Monitoramento de Alarmes');

function login(I) {
    I.waitForElement('#username', 15);
    I.fillField('#username', process.env.USUARIO_WEG);
    I.fillField('#password', process.env.SENHA_WEG);
    I.click('#login_button');
}

  Scenario('Deve acessar alarmes do motor AEG02 com sucesso', async ({ I }) => {
    I.amOnPage(process.env.URL_SISTEMA);
    I.switchTo('iframe#mainframe');

    // Login
    login(I);

    // Navegação
    I.waitForText('Rio Grande DS', 20); // confirmação de login e carregamento inicial
    I.click('Rio Grande DS');
    I.click('Ibirapuita');
    I.waitForText('AEG02', 10);
    I.click('AEG02');

    // Ponto crítico da aplicação, necessita de um time para carregar
    I.wait(2);

    I.click('Alarmes / registros');
    I.waitForText('Alarmes', 10);

    // Evidência
    I.saveScreenshot('alarmes_aeg02.png');

    I.say('Fluxo crítico validado com sucesso');
}).tag('@smoke')

// Lofin inválido (sem senha)
Scenario('Falha de login, digitando apenas usuário', ({ I }) => {
    I.amOnPage(process.env.URL_SISTEMA);
    I.switchTo('iframe#mainframe');

    I.waitForElement('#username', 15);
    I.fillField('#username', process.env.USUARIO_WEG);
    I.click('#login_button');

    I.waitForText('Acessar falhou - nome de usuário/senha errada', 10);

    I.saveScreenshot('login_sem_senha.png');

}).tag('@negativo')

// Login inválido (sem usuário)
Scenario('Falha de login, digitando apenas senha', ({ I }) => {
    I.amOnPage(process.env.URL_SISTEMA);
    I.switchTo('iframe#mainframe');

    I.waitForElement('#username', 15);
    I.fillField('#password', process.env.SENHA_WEG);
    I.click('#login_button');

    I.waitForText('Acessar falhou - nome de usuário/senha errada', 10);

    I.saveScreenshot('login_sem_usuário.png');
    
}).tag('@negativo')
