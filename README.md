# React Starter

A basic starter for a React App.
I put this together to have something much more basic than
[Create React App](https://github.com/facebook/create-react-app).

I've used CRA before and I am sure I will again, but it's also
nice to have a simpler option and feel like you have full control.

Have a look at [package.json](./package.json) to see the available scripts
as well as required dependencies.

Some goals:

- TS in both _code and tests_
- Easy to upgrade individual packages
- Simple build/bundling
- Basic CI in place
- Code quality like formatting, linting, coverage etc.

## Setup

1. [Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. `nvm use`
3. `npm install`
4. `npx msw init dist` - install the service worker for development

## Starting the development server

```
npm start
```

Open [http://localhost:1234/](http://localhost:1234/)

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
