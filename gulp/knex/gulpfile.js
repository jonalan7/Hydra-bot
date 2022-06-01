const {
  src,
  dest
} = require('gulp');
const path = require('path');

function copy(){
  return src('../../src/knexfile.js').pipe(
    dest(path.resolve(__dirname, '../../dist/'))
  );
}
exports.default = copy;
 