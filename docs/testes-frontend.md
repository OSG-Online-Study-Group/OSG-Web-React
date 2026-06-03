# Testes Automatizados do Frontend Web OSG

## Visão geral das camadas testadas

O frontend web do OSG passa a ter três camadas de validação:

- **Unitários:** validam regras puras de negócio, como cálculo de nível por XP, título do nível e progresso dentro do nível atual.
- **Integração de componentes:** renderizam telas React com dados simulados para validar interface, mensagens, estatísticas, fluxo de quiz e erro de login.
- **E2E no navegador:** executam fluxos reais no navegador com Playwright, usando mocks locais para autenticação, ranking, perfil e quiz diário.

## Ferramentas usadas

- **Vitest:** executor dos testes unitários e de integração.
- **React Testing Library:** renderização dos componentes e validação por comportamento visível ao usuário.
- **@testing-library/user-event:** simulação de cliques e digitação.
- **jsdom:** ambiente DOM para testes React sem navegador real.
- **Playwright:** testes E2E em navegador, geração de capturas de tela, trace, vídeo em caso de falha e relatório HTML.

## Como rodar

```bash
npm run lint
npm run build
npm run test:unit
npm run test:e2e
```

Comandos auxiliares:

```bash
npm run test:unit:watch
npm run test:e2e:ui
npm run test:e2e:report
npm run test:all
```

## Comportamentos cobertos

- Cálculo de níveis pelos marcos de XP: 0, 100, 300, 600, 1000, 1500 e 2500.
- Barra de progresso do nível com XP total, XP do nível atual, XP restante e porcentagem.
- Tela de Menu com dados simulados de usuário, ranking, vitórias, matéria principal e progresso.
- Tela de Perfil com dados do usuário, grupos, XP, nível e progresso.
- Quiz Diário com interação em perguntas e resultado final com XP conquistado.
- Login com falha de autenticação simulada.
- Fluxos E2E autenticados em `/menu`, `/perfil` e `/quiz-diario`.
- Validação básica de layout responsivo em viewport mobile.

## Evidências geradas

- Capturas de tela dos fluxos E2E:
  - `test-results/screenshots/chromium-menu.png`
  - `test-results/screenshots/chromium-perfil.png`
  - `test-results/screenshots/chromium-quiz-concluido.png`
  - `test-results/screenshots/chromium-mobile-menu.png`
  - `test-results/screenshots/mobile-chrome-menu.png`
  - `test-results/screenshots/mobile-chrome-perfil.png`
  - `test-results/screenshots/mobile-chrome-quiz-concluido.png`
  - `test-results/screenshots/mobile-chrome-mobile-menu.png`
- Relatório HTML do Playwright:
  - `playwright-report/index.html`
- Traces e vídeos são mantidos automaticamente quando houver falha.

## Limitações e sugestões de melhoria

- Firebase e OpenRouter são mockados nos testes E2E, então não há validação ponta a ponta contra produção.
- Os testes não validam regras reais de segurança do Firestore.
- Upload real de imagem via Cloudinary não está coberto.
- Chat, duelo com amigo, duelo aleatório e upload de foto devem entrar em uma próxima rodada de cobertura.
- Uma evolução recomendada é usar Firebase Emulator para testar integração sem tocar dados reais.
- Os scripts devem ser adicionados ao CI antes do deploy para bloquear regressões automaticamente.
