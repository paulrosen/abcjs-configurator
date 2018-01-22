# abcjs-configurator
> Understanding the options that are passed to abcjs

This app contains every option that can be used in [abcjs](https://abcjs.net) and allows the user to easily play with each option.

This app is deployed to [Configurator](https://configurator.abcjs.net) so you don't have to clone the project to get the benefit of it.

## This Project's Creation

The initial generation of this project was done with:
``` bash
npx create-nuxt-app abcjs-configurator
npx: installed 318 in 9.43s
> Generating Nuxt.js project in /path/to/project/abcjs-configurator
? Project name abcjs-configurator
? Project description Understanding the options that are passed to abcjs
? Use a custom server framework none
? Use a custom UI framework vuetify
? Choose rendering mode Universal
? Use axios module yes
? Use eslint yes
? Author name Paul Rosen
```

## To develop

Start the server with:
``` bash
npm run dev
```
The page is at `localhost:3000`.

## To deploy

Static pages are generated into the `/dist` folder, then those files are copied to the server. There is a bash script for that called `deploy-to-production.sh` that does this:
``` bash
./deploy-to-production.sh
```

It requires the file `deploy-constants.sh`. You can see the format that this file should have by copying the file `deploy-contants-example.sh`.

## Build Setup

(These are the initial instructions that were generated with the example app.)

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
