const {
  src,
  dest
} = require('gulp');
const path = require('path');

function copy(){
  return src('../../src/ws/views/**').pipe(
    dest(path.resolve(__dirname, '../../dist/ws/views'))
  );
}
exports.default = copy;
 