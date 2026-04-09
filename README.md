# Automação E2E - Sistema SCADA Industrial

Este projeto é uma automação construída para validar o fluxo crítico de login e a navegação profunda na árvore de ativos de um sistema SCADA de missão crítica. 

O objetivo é garantir que a interface suporte a operação diária e que o painel de "Alarmes / Registros" esteja acessível para os operadores de planta.

## Desafios Encontrados e Soluções

Sistemas industriais front-end frequentemente apresentam comportamentos instáveis devido ao peso do processamento de dados. Para contornar isso, apliquei as seguintes estratégias:

- **Controle de iFrames:** Todo o sistema opera confinado em um `iframe#mainframe`. A automação gerencia a troca de contexto nativamente pelo Playwright logo no início da execução.
- **Micro-Pausas para Estabilidade de UI:** Durante a navegação em nós profundos da árvore (ex: 'Ibirapuita' -> 'AEG02'), o sistema entra em *Race Condition* (a interface tenta desenhar o botão antes do JavaScript interno ativá-lo). Implementei um `wait()` estratégico e cirúrgico de 2 segundos para estabilizar a DOM antes do clique final em "Alarmes", eliminando falhas de falso-negativo.
- **Smart Waits na Casca:** Substituição de pausas fixas por `waitForText` e `waitForElement` durante a transição de telas, permitindo que a automação acompanhe a velocidade do servidor dinamicamente.
- **Blindagem de Dados Sensíveis:** Utilização da biblioteca `dotenv`. Todas as credenciais de acesso, IPs e rotas internas são injetadas em tempo de execução e omitidas do controle de versão pelo `.gitignore`.

## Cenário de Teste (BDD)

**Feature:** Monitoramento de Alarmes de Ativos (SCADA)
Como um operador de planta
Eu quero acessar o sistema SCADA e navegar até a tela de alarmes de um motor específico
Para que eu possa monitorar falhas (ERROR/WARNING) e tomar decisões operacionais.

**Cenário:** Validação de carregamento de alarmes do motor AEG02
  Dado que eu acesso o portal SCADA com credenciais de operador
  E navego pela árvore de ativos ("Rio Grande DS" > "Ibirapuita")
  Quando eu seleciono o motor "AEG02"
  E clico na aba "Alarmes"
  Então o sistema deve exibir o título da aba correspondente
  E carregar a tabela de dados dinâmicos de falhas do ativo

## Stacks
- **Node.js**
- **CodeceptJS** (Framework BDD E2E)
- **Playwright** (Engine Chromium para alta performance)
- **Dotenv** (Segurança)
