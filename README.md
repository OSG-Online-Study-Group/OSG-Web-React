# OSG Web - Online Study Group

Frontend web em React + Vite para o aplicativo OSG. A web utiliza o mesmo Firebase Auth/Firestore do app mobile, Cloudinary para avatar, OpenRouter para quizzes e Socket.io para duelo aleatorio.

## Ambiente

1. Instale dependencias com `npm install`.
2. Crie `.env` a partir de `.env.example`.
3. Configure as variaveis `VITE_FIREBASE_*`, `VITE_OPENROUTER_API_KEY`, `VITE_CLOUDINARY_*` e `VITE_SOCKET_URL`.
4. Inicie com `npm run dev`.

O upload Cloudinary requer um upload preset unsigned existente. A chave OpenRouter e exposta no bundle web conforme a arquitetura sem backend adicional definida para este projeto.

## Verificacao

```bash
npm run lint
npm run build
```

## Deploy

O deploy automatico permanece no GitHub Pages pelo workflow em `.github/workflows/deploy.yml`. Cadastre todas as variaveis Vite como secrets do repositorio antes da publicacao.

## Git Flow

- `main`: versoes publicadas.
- `develop`: integracao de entregas aprovadas.
- `feature/*`: funcionalidades.
- `fix/*`: correcoes.
- `release/*`: preparacao de versoes.

As funcionalidades devem chegar a `develop` via pull request e seguir para `main` somente apos validacao da release.
