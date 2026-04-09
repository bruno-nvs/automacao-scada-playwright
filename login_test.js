require('dotenv').config();

Feature('Login');

Scenario('Login com sucesso', ({ I }) => {
    I.amOnPage(process.env.URL_SISTEMA);
    I.switchTo('iframe#mainframe');
    I.waitForElement('#username', 15);
    I.click('#username');
    I.fillField('#username', process.env.USUARIO_WEG);
    I.fillField('#password', process.env.SENHA_WEG);
    I.click('#login_button');
    I.waitForText('Rio Grande DS', 20);
    I.click('Rio Grande DS');
    I.click('Ibirapuita');
    I.waitForText('AEG02', 10);
    I.click('AEG02');
    I.wait(2);
    I.click('Alarmes / registros');
    I.wait(10);
    I.saveScreenshot('Login e Navegação Ok.png');
    I.say('🚀 Login, Navegação e Carregamento de Alarmes realizados com SUCESSO!');
});