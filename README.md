# React Starter

A basic starter for a React App.
I put this together to have something much more basic than
[Create React App](https://github.com/facebook/create-react-app).

## What do you get?

- TypeScript in both code and tests
- Mock API
- Docker based development and CI
- Easy to upgrade individual packages
- Simple build/bundling
- Code quality like formatting, linting, coverage etc.

## Included Libraries

- [msw](https://mswjs.io/)
- [react-query](https://react-query.tanstack.com/)
- [react-router](https://reactrouter.com/)
- [typescript](https://www.typescriptlang.org/)
- [vite](https://github.com/vitejs/vite)
- [vitest](https://vitest.dev/)

## Recommended Libraries

These libraries are not included, but recommended as needed

- [date-fns](https://github.com/date-fns/date-fns) - Modern JavaScript date utility library
- [mantine](https://github.com/mantinedev/mantine/) - React components library with native dark theme support
- [ts-belt](https://github.com/mobily/ts-belt) - Fast, modern, and practical utility library for FP in TypeScript.
- [zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference

## Local Development

You can develop locally via Docker.

```bash
./scripts/dev
```

This will start a Bash session **inside a container** with development dependencies installed
and the local source code mounted as a volume.

As an example try running:

```bash
npm run build
```

You can edit code on your local machine and re-run the command above (or any other command).
The intent is to _edit_ code from your local machine
and _operate_ on the code from within the container (compile etc.).

When you are done you can exit the container with `ctrl + d`.

## Starting the development server

```
npm start
```

Open [http://localhost:5174/](http://localhost:5174/)

## Running the tests

```
npm test
```

Runs the tests in watch mode.

## Build the code

```
npm run build
```

Builds the code for distribution

## Development without Docker

If you prefer to develop "on the metal" I would recommend
using NVM.

1. [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. `nvm use`
3. `npm install`

## TODO:

- Upgrade to React 18
- Use [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- Clean up test coverage output to exclude unnecessary files like mocks
