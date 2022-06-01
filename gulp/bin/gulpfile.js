const {
  src,
  dest
} = require('gulp');
const path = require('path');

function copy(){
  return src('../../src/bin/**').pipe(
    dest(path.resolve(__dirname, '../../node_modules/.bin/'))
  );
}
exports.default = copy;
 