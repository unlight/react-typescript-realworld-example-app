# RealWorld Example App

> ### React/Recoil/TypeScript codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://github.com/gothinkster/realworld) [RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **React/Recoil/TypeScript** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **React/Recoil/TypeScript** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## Stack

-   TypeScript
-   React
-   Recoil
-   Vite
-   Jest
-   ESLint

## How it works

### Layers:

-   App (Pages) -> Application <- (via interface) <- API (Services, Infrastructure)
-   Common: UI

### Architecture notes

-   use case it is command in application/feature/commands
-   src/ui: reusable components

## Getting started

```sh
npm ci
npm run dev
```

## Resources

-   https://demo.realworld.io/
-   https://github.com/gothinkster/realworld/tree/master/spec#frontend-specs
-   https://github.com/recoil-world/react-recoil-realworld-example-app
-   https://gist.github.com/unlight/68a69ba19c06512f18f254ff702a9e38 - frontend architecture layers

## Todo

-   https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md
-   https://github.com/gothinkster/realworld/tree/master/api
-   Configure eslint import rules (dependency direction)
-   pagination
-   use https://github.com/erictooth/react-stateful-tabs
-   use 2 components for tabs do not use feed query param

## Users

-   tetikokucy@mailinator.com
-   mynesy@mailinator.com
-   gymynaxeru@mailinator.com
