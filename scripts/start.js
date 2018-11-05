const path = require('path');
const child_process = require('child_process');
const constants = require('./constants');

executeInOrder(
    compileTypeScript,
    copyAssets,
    startElectron
);


function executeInOrder(...fnList){
    fnList.forEach(fn => proceed(fn))
}


function compileTypeScript(){
    exec(`npx tsc -p ${constants.ROOT_PATH}`);
}

function copyAssets(){
    const files = [
        path.join(constants.SRC_PATH, 'index.html')
    ];

    files.forEach(filePath => exec(`copy /Y ${filePath} ${constants.DIST_PATH}`))
}

function startElectron() {
    const DIST_PATH = constants.DIST_PATH;
    const entryJsPath = path.join(DIST_PATH, 'index.js');

    exec(`npx electron ${entryJsPath}`, {cwd: DIST_PATH});
}


function proceed(fn){
    const taskName = fn.name;

    console.group(taskName);

    try {
        console.log('begin');
        fn();
    } catch(e) {
        console.error('ERROR', e.message, e);
        throw e;
    } finally {
        console.log('end');
        console.groupEnd();
    }
}

function exec(command, options = {}){
    console.log(`executing command ${command}`);

    child_process.execSync(command, {
        cwd: constants.ROOT_PATH,
        ...options
    });
}



