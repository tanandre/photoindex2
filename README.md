# photoindex
A Synology photo album application that allows you to tag and search for photos. Back-end is NodeJS (separate repo) that auto creates tags using Jpeg EXIF data. 

Since it's running on my local Synology server no demo available.

![Screenshot](/photoindex.png?raw=true "Screenshot")

## Build Setup


1. Make sure the Synology can be accessed as is defined in config/index.js proxyTable.
2. ```npm run i``` 
3. ```npm run dev```.

## NPM commands:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
