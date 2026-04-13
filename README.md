# Automação E2E - SCADA (Monitoramento de Alarmes)

Automação end-to-end desenvolvida com Playwright + CodeceptJS para validar um fluxo crítico de um sistema SCADA industrial.

O teste simula o comportamento de um operador, garantindo que seja possível acessar e monitorar alarmes de ativos através da interface.

---

## 🎯 Objetivo

Validar um fluxo essencial do sistema:

- Autenticação de usuário
- Navegação na árvore de ativos
- Acesso ao painel de alarmes
- Verificação de carregamento da interface

---

## 🧪 Cenários Automatizados

### 🟢 Fluxo principal (Smoke Test)

- Login com credenciais válidas  
- Navegação até o ativo **AEG02**  
- Acesso ao painel **"Alarmes / registros"**  
- Validação de carregamento da tela  

---

### 🔴 Cenários negativos

- Tentativa de login sem senha  
- Tentativa de login sem usuário  
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

A aplicação é executada dentro de um `iframe`, exigindo troca de contexto antes das interações.

---

### Sincronização de UI (Ponto crítico)

Durante a navegação na árvore de ativos, foram identificados problemas como:

- Elementos visíveis, mas não clicáveis  
- Delay entre renderização e ativação de eventos  

#### Estratégia adotada:

- Uso de esperas dinâmicas (`waitForElement`, `waitForText`)
- Uso de `wait(2)` em ponto específico da navegação

Esse comportamento foi validado na prática:  
sem o `wait`, o teste apresentava falhas intermitentes (flaky).

> Decisão: priorizar estabilidade da automação em um sistema com comportamento assíncrono inconsistente.

---

## 🏷️ Execução por Tags

```bash
# Fluxo principal
npx codeceptjs run --grep "@smoke"

# Testes negativos
npx codeceptjs run --grep "@negativo"
