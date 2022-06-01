const {
  src,
  dest
} = require('gulp');
const path = require('path');

function copy(){
  return src('../../dist/**').pipe(
    dest(path.resolve(__dirname, '../../node_modules/hydra-bot/dist'))
  );
}
exports.default = copy;
 