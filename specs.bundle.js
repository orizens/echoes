import angular from 'angular';
import mocks from 'angular-mocks';

//- adpoted from NG6 Boilerplate
// import * as main from './src/app';
// We use the context method on `require` which Webpack created
// in order to signify which files we actually want to require or import.
// Below, `context` will be a/an function/object with file names as keys.
// Using that regex, we scan within `client/app` and target
// all files ending with `.spec.js` and trace its path.
// By passing in true, we permit this process to occur recursively.
let context = require.context('./src/core/', true, /\.spec\.js/);
let components = require.context('./src/components/youtube-videos/', true, /\.spec\.js/);

// Get all files, for each file, call the context function
// that will require the file and load it here. Context will
// loop and require those spec files here.
context.keys().forEach(context);
components.keys().forEach(components);