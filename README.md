# Automação E2E - SCADA (Monitoramento de Alarmes)

Projeto de automação end-to-end focado na validação de um fluxo crítico em sistema SCADA: autenticação, navegação na árvore de ativos e acesso ao painel de alarmes.

O cenário cobre uma operação real de um operador de planta, garantindo que o sistema permita o monitoramento de falhas de equipamentos de forma consistente.

---

## 🔍 Cobertura dos Testes

- Login no sistema
- Navegação hierárquica de ativos
- Acesso ao painel "Alarmes / registros"
- Validação de carregamento da interface
- Testes negativos de autenticação

---

## ⚙️ Stack

- Node.js  
- CodeceptJS (BDD)  
- Playwright  
- dotenv  

---

## ⚠️ Desafios Técnicos

### iFrame

A aplicação é renderizada dentro de um `iframe`, exigindo controle explícito de contexto antes de qualquer interação.

---

### Sincronização de UI

Durante a navegação na árvore de ativos, o sistema apresenta comportamento assíncrono inconsistente:

- Elementos visíveis, mas ainda não interativos
- Delay entre renderização e ativação de eventos

#### Estratégia adotada:

- Uso de `waitForElement` e `waitForText` no fluxo padrão
- Uso de `wait` fixo em ponto crítico da navegação (acesso ao ativo)

Esse comportamento foi validado empiricamente:  
sem o `wait`, o teste apresenta falhas intermitentes.

> Decisão: priorizar estabilidade e evitar falsos negativos em um sistema com baixa previsibilidade de renderização.

---

## 🧪 Cenários de Teste (BDD)

Feature: Monitoramento de Alarmes em Sistema SCADA

  Como operador de planta
  Quero acessar os alarmes de um ativo
  Para monitorar falhas operacionais

  Cenário: Acesso aos alarmes do motor AEG02
    Dado que acesso o sistema com credenciais válidas
    Quando navego pela árvore de ativos "Rio Grande DS" > "Ibirapuita"
    E seleciono o motor "AEG02"
    E acesso a aba "Alarmes / registros"
    Então o sistema deve exibir o painel de alarmes corretamente

  Cenário: Tentativa de login sem senha
    Dado que acesso a tela de login
    Quando informo apenas o usuário
    E tento realizar o login
    Então o sistema deve exibir mensagem de erro

  Cenário: Tentativa de login sem usuário
    Dado que acesso a tela de login
    Quando informo apenas a senha
    E tento realizar o login
    Então o sistema deve exibir mensagem de erro


## 📊 O que este projeto demonstra

- Automação E2E em sistema com UI instável
- Tratamento de race condition
- Estratégia híbrida de sincronização
- Organização de testes com BDD
