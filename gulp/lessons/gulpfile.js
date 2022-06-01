const {
  src,
  dest
} = require('gulp');
const path = require('path');

function copy(){
  return src('../../src/ws/lessons/**').pipe(
    dest(path.resolve(__dirname, '../../dist/ws/lessons/'))
  );
}
exports.default = copy;
 