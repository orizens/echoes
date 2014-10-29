var $ = require('jquery');
var Backbone = require('backbone');
var exts = require('./backbonepkg.js');

Backbone.$ = $;
exts(Backbone);

module.exports = Backbone;