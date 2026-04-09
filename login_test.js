require('dotenv').config();

Feature('Login');

Scenario('Login com sucesso', ({ I }) => {
    I.amOnPage(process.env.URL_SISTEMA);
    I.switchTo('iframe#mainframe');
    I.wait(5);
    I.click('#username');
    I.fillField('#username', process.env.USUARIO_WEG);
    I.fillField('#password', process.env.SENHA_WEG);
    I.click('#login_button');
    I.wait(5);
    I.click('Rio Grande DS');
    I.click('Ibirapuita');
    I.wait(5);
    I.click('AEG02');
    I.wait(5);
    I.click('Alarmes / registros');
    I.wait(20); // Aguarda um pouco para garantir que a página carregue
    I.saveScreenshot('Login e Navegação Ok.png');
    I.say('🚀 Login, Navegação e Carregamento de Alarmes realizados com SUCESSO!');
})