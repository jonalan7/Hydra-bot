const {
  src,
  dest
} = require('gulp');
const path = require('path');

function copy(){
  return src('../../src/bin/**').pipe(
    dest(path.resolve(__dirname, '../../dist/bin'))
  );
}
exports.default = copy;
 