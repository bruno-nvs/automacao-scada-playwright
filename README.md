# Automação E2E - SCADA (Monitoramento de Alarmes)

Projeto de automação de testes focado na validação de um fluxo crítico em um sistema SCADA industrial, combinando abordagem end-to-end com análise exploratória de comportamento da interface.
O teste simula o uso real por um operador de planta, com foco em confiabilidade do acesso aos alarmes e estabilidade da navegação em cenários com UI assíncrona.

---

## 🎯 Objetivo

Validar a operação de monitoramento de alarmes considerando:

- Autenticação no sistema
- Navegação na árvore de ativos
- Acesso ao painel de alarmes
- Comportamento da interface sob condições reais de carregamento

---

## 🧪 Abordagem de Teste

Este projeto não se limita a automação tradicional. Ele combina:

### 🔎 Teste exploratório guiado
- Identificação de comportamentos inconsistentes da UI
- Observação de falhas intermitentes durante navegação

### 🔄 Teste end-to-end (E2E)
- Validação completa do fluxo do usuário
- Garantia de funcionamento do caminho crítico

### 🧠 Teste investigativo
- Análise de race condition na interface
- Ajustes baseados em comportamento real da aplicação

---

## 🧪 Cenários Automatizados

### 🟢 Fluxo crítico (Smoke Test)

- Login com credenciais válidas  
- Navegação até o ativo **AEG02**  
- Acesso ao painel **"Alarmes / registros"**  
- Validação do carregamento da tela  

---

### 🔴 Cenários negativos

- Login sem senha  
- Login sem usuário  
- Validação de mensagem de erro  

---

## ⚙️ Stack

- Node.js  
- CodeceptJS  
- Playwright  
- dotenv  

---

## ⚠️ Desafios Técnicos

### iFrame

A aplicação é renderizada dentro de um `iframe`, exigindo troca explícita de contexto antes das interações.

---

### Sincronização de UI (Ponto crítico)

Durante a navegação na árvore de ativos, foram observados:

- Elementos visíveis, porém não interativos  
- Delay entre renderização e ativação de eventos  

#### Estratégia adotada:

- Uso de waits dinâmicos (`waitForElement`, `waitForText`)
- Uso de `wait(2)` em ponto específico da navegação

Esse comportamento foi validado empiricamente:  
sem a espera controlada, o teste apresentava falhas intermitentes (flaky).

> Decisão técnica: priorizar estabilidade da automação em um sistema com comportamento assíncrono inconsistente.

---

## 🏷️ Execução

```bash
# Fluxo crítico
npx codeceptjs run --grep "@smoke"

# Testes negativos
npx codeceptjs run --grep "@negativo"
