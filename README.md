### DV01-Frontend Challenge

There are three packages in this monorepo
`dv01-api`: contains code that returns data consumed by widgets in `dv01-prod`
`dv01-solar`: contains UI library components such as `<Button />` and `<Select />`
`dv01-prod`: is the "production application"

### Microfrontend Architecture with Federated Modules:
- `dv01-prod` is the `HOST` application that consumes `dv01-api` and `dv01-solar` to run.
- from project root: `cd ./packages/dv01-api && npm install && npm run start`
- from project root: `cd ./packages/dv01-solar && npm install && npm run start`
- from project root: `cd './packages/dv01-prod && npm install && npm run start`

With the exception of `dv01-prod`, every other package can be run stand alone.

### Why I chose this Architecture
- Different teams can work deploy at their own pace and choose their own technology stack.
- As widgets grow in complexity, they can be split off into their own MFE.

### How types are shared across project:
- Types are fetched in development at run time. I do not want to force projects to be linked in this monorepository in order to keep type and itellisense.

- When running `npm start` in `dv01-solar`, a tarball file is automatically generated with [@TouK/federated-types](https://github.com/TouK/federated-types) and stored in the `public/` directory of that project.
- `dv01-prod` uses [webpack-remote-type-plugins](https://github.com/ruanyl/webpack-remote-types-plugin) to automatically fetch and unzip the tarball files containing the types definitions.


### Things I would like to add
- one run script to start the project in dev.
- automatic fallback to previous available version if an MFE runtime is not available.
- Storybook for UI components
- Unit testing
- eslint + prettier

### How long this took me:
- [release-1](https://github.com/sjBao/aggregate-balance/tree/release-1) on and off, took me about about 3.5 hours.
    - prototype about 1.5 hour
    - refactored `Button` and `Select` to custom component - about 1 hour
    - styling - about 1 hour
- [release-2-micro-services](https://github.com/sjBao/aggregate-balance) on and off, took me an additional 5-7 hours
    - remove `CRA` and implement mfe-architecture - the rest of the time
    - I hope the extra effort I put helps this project stand out 😅
