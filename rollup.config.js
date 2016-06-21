import babel from 'rollup-plugin-babel';
import string from 'rollup-plugin-string';

export default {
  entry: 'src/app.js',
  format: 'cjs',
  plugins: [ 
  	string({
		extensions: ['.html']
  	}),
  	babel()
  ],
  dest: '.tmp/bundle-roll.js'
};