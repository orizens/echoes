# Echoes Player ~(EMC)
Echoes is a great youtube player developed by [Oren Farhi](http://orizens.com).
It's fun & easy to listen or watch videos from youtube with Echoes.
What if youtube was designed to be used as music player?

Echoes Player is also available as a [Chrome Application](https://chrome.google.com/webstore/detail/echoes-player/aaenpaopfebcmdaegggjbkhaedlbbkde)

It can be regarded as the Media Player experience for youtube listening pleasure.
Other than that - it's a sample web app built with Backbone, Bootstrap and Require.js.
It is the full version of [Tikal's Backbone Workshop Project](http://tikalk.com).

## Updates & Help
Echoes is constantly developed and enhanced with missing features such as creating playlists, organizing by albums or other favorite attribute.
You may suggest, contribute or reporting various issues in the [issues](https://github.com/orizens/echoes/issues) system.

## Developer Notes

to run and build the project, please install:
* nodejs
* gruntjs
* bower.io

on shell, run:
```shell
npm install
bower install
```
### Development mode
To run the project, please use:
```shell
grunt serve
```

### Grunt Build
to create a build for production, run
```shell
grunt build
```
to create a build for production and publish on gh-pages branch, run:
```shell
grunt buildgit
```
this will create a build on a .tmp directory, checkout gh-pages and copy the build to it.
next steps to publish to gh-pages are:
* add & commit changes and new additions
* push the branch to remote (github currently)

### CSS
LESS is integrated as well as requirejs build. 
This are compiled using grunt modules both in dev and build modes:
1. LESS modules.less
2. RequireJS style.css

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/orizens/echoes/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
