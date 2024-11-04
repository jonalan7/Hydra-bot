const { src, dest } = require('gulp');
const path = require('path');

function copy() {
  return src('../../src/ws/help/sqlite.js').pipe(
    dest(path.resolve(__dirname, '../../dist/ws/help/'))
  );
}
exports.default = copy;
