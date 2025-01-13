const { src, dest } = require('gulp');
const path = require('path');

function copy() {
  return src('../../src/@types/**').pipe(
    dest(path.resolve(__dirname, '../../dist/@types'))
  );
}
exports.default = copy;
