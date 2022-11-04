# RealWorld Example App

> ### React/Recoil/TypeScript codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://github.com/gothinkster/realworld) [RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **React/Recoil/TypeScript** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **React/Recoil/TypeScript** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## Stack

- TypeScript
- React
- Recoil
- Vite
- ESLint

## How it works

### Layers:

- App (Pages) -> Application <- (via interface) <- API (Services, Infrastructure)
- Common: UI

### Architecture notes

- src/components: reusable ui components

## Getting started

```sh
npm ci
npm run dev
```

## Resources

- https://demo.realworld.io/
- https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints
- https://github.com/recoil-world/react-recoil-realworld-example-app
- https://gist.github.com/unlight/68a69ba19c06512f18f254ff702a9e38 - frontend architecture layers
- https://blog.johnnyreilly.com/2022/09/20/react-usesearchparamsstate/

## Todo

- pagination - https://tailwindow.github.io/component-tailwindcss/components/button/pagination/index.html#
  https://ahooks.js.org/hooks/use-pagination
- get rid of class-validator (use zod)
- switch to react location
- https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints
- https://github.com/gothinkster/realworld/tree/master/api
- react boundaries
- use suspension
- use https://github.com/erictooth/react-stateful-tabs
- use 2 components for tabs do not use feed query param
- setIsLoading make as global indicator error and pending
- notification component https://www.tailwind-kit.com/components/alert https://tailwindow.github.io/component-tailwindcss/components/alert/alert-1/index.html https://tailwindow.github.io/component-tailwindcss/components/alert/alert-2/index.html

## Users

- gymynaxeru@mailinator.com
- tetikokucy@mailinator.com
- mynesy@mailinator.com
- password: Pa$$w0rd!
