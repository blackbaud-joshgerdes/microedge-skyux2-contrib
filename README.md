# microedge-skyux2-contrib

### A holding place for Microedge SkyUX components that are yet contributed to the main SkyUX repository.

[SkyUX 2](https://developer.blackbaud.com/skyux2/) is a new version of Blackbaud's user experience framework. The UX framework brings a consistent, cohesive experience to our products and allows third-party developers to provide the same consistent experience in their customizations and applications. With AngularJS now in maintenance mode and Angular 2 in general availability, SKY UX 2 takes advantage of [Angular 2](https://angular.io/) to keep SKY UX modern while increasing the tooling, testing, and performance available.

## Getting Started

- Add modules to **/src/app/public/src/modules**.
- Each module you create will need to be exported by the "Library" module, located here: **/src/app/public/src/library.module.ts**.
- In the **/src/app/public/src/modules/shared** folder, you will find a `SkyContribConfigService`. This is a provider that will allow your modules to access the contents of **skyuxconfig.json**. You can add your module's configuration to the `appSettings.myLibrary` section of the config.

## Install dependencies and view the example

```
npm install
npm start
```

## Bundle your library:

```
npm run build
```

## Test your library:

```
npm test
```

## Publish your library:

After logging in with a npm account with proper permissions, within the **dist** folder run:
```
npm publish
```
