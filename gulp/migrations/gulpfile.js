const {
  src,
  dest
} = require('gulp');
const path = require('path');

function copy(){
  return src('../../src/ws/migrations/**').pipe(
    dest(path.resolve(__dirname, '../../dist/ws/migrations/'))
  );
}
exports.default = copy;
 