const path = require('path');

const ROOT_PATH = path.resolve(path.join(__dirname, '..'));
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const SRC_PATH = path.join(ROOT_PATH, 'src');

module.exports = {
    ROOT_PATH,
    DIST_PATH,
    SRC_PATH
};