[![Build Status](https://travis-ci.org/orizens/echoes.svg?branch=angular)](https://travis-ci.org/orizens/echoes)

>
> # Check out [Echoes Player 2](http://github.com/orizens/echoes-ng2) - built with Angular 2 & Ngrx - [production app](http://orizens.github.io/echoes-ng2)
>

# Echoes Player ~(EMC)

[![Greenkeeper badge](https://badges.greenkeeper.io/orizens/echoes.svg)](https://greenkeeper.io/)
Echoes is a great youtube player developed by [Oren Farhi](http://orizens.com).
It's fun & easy to listen or watch videos from youtube with Echoes.
What if youtube was designed to be used as music player?

Echoes Player is also available as a [Chrome Application](https://chrome.google.com/webstore/detail/echoes-player/aaenpaopfebcmdaegggjbkhaedlbbkde)

It can be regarded as the Media Player experience for youtube listening pleasure.
## Tech Review
it's a sample web app built with Angular JS v1.x, Bootstrap v3.x, ES2015 and Loader Spec.

## Updates & Help
Echoes is constantly developed and enhanced with missing features such as creating playlists, organizing by albums or other favorite attribute.
You may suggest, contribute or reporting various issues in the [issues](https://github.com/orizens/echoes/issues) system.

## Requirements

1. Install NodeJS - http://nodejs.org/ or via [command line](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
4. Phantomjs (client testing): ```npm install phantomjs```
6. for Node Debugging using [node inspector](https://github.com/node-inspector/node-inspector): ```npm install -g node-inspector```
(? install less ```npm install -g less```)

### Development mode
To run the project, please use:
```npm start```

## Tests
Tests are invoked via terminal

### UI Unit Tests
Running unit tests ```npm test```
Running unit tests in debug mode - ```npm run testd```

#### Running local unit tests with Browserstack
**not working at the moment**
Taken from [github](https://github.com/browserstack/browserstack-runner-sample)
run this in one terminal - ```./BrowserStackLocal browserstack.key```
run this in another terminal - ```browserstack-runner```
1. use browserstack.json

### End To End Tests
1. Pioneer.js - ```npm run pioneer```
1. Protractor - ```npm run e2e```
1. Protractor with Debug Mode - ```npm run e2ed```
1. Protractor in Browserstack - ```gulp test:e2e```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/orizens/echoes/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
