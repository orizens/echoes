This is a nodejs playground.

## instructions
1. npm install

## How To Debug
* run in command line in root folder: 
```
node --debug app.js
```
* optionally, run nodemon for auto restart server:
```
nodemon --debug app.js
```
* open another command line
```
node-inspector &
```
* open url printed to the console of node-inspector

## How to push to heroku
* Make sure the "heroku keys" has the current computer name binded to the user email
* if not: remove all keys with heroku:remove
* heroku login with your username
* generate new in ( /Users/user/.ssh): ssh-keygen -t rsa
*- add the key: heroku keys:add ~/.ssh/id_rsa.pub
* checkout brach heroku
* git push heroku heroku:master