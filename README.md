# Automação E2E - SCADA (Monitoramento de Alarmes)

Projeto de automação end-to-end voltado para validação de fluxos críticos em um sistema SCADA industrial, utilizando abordagem baseada em comportamento real da aplicação e análise de estabilidade da interface.

O projeto simula operações executadas por um operador de monitoramento, validando autenticação, navegação entre ativos e acesso ao painel de alarmes em um ambiente com comportamento assíncrono.

---

## Objetivo

Validar o fluxo crítico de monitoramento de alarmes considerando:

- Autenticação no sistema
- Navegação entre ativos do parque
- Acesso ao painel de alarmes
- Estabilidade da interface durante carregamento assíncrono
- Tratamento de cenários negativos de login

---

## Estratégia de Teste

O projeto combina diferentes abordagens utilizadas:

### Teste Exploratório Guiado
- Identificação de inconsistências na interface
- Observação de falhas intermitentes durante navegação
- Análise de comportamento assíncrono da aplicação

### Teste End-to-End (E2E)
- Validação completa do fluxo do operador
- Garantia do funcionamento do caminho crítico

### Teste Investigativo
- Análise de sincronização da interface
- Tratamento de comportamento flaky
- Ajustes baseados em comportamento real da aplicação

---

## Cenários Automatizados

### Fluxo Crítico (Smoke Test)

- Login com credenciais válidas
- Navegação até o ativo `AEG02`
- Acesso ao painel `Alarmes / registros`
- Validação do carregamento da interface
- Geração de evidência via screenshot

---

### Cenários Negativos

- Login sem senha
- Login sem usuário
- Validação de mensagens de erro
- Verificação de comportamento da autenticação

---

## Tecnologias Utilizadas

- Node.js
- CodeceptJS
- Playwright
- dotenv

---

## Estrutura do Projeto

```txt
.
├── steps/
│   ├── login.js
│   └── navigation.js
├── output/
├── login_test.js
├── codecept.conf.js
├── .env
└── README.md
