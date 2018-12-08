const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const constants = require('./constants');

executeInOrder(
    cleanDirectory,
    compileMainProcess,
    compileRenderProcess,
    copyAssets,
    startElectron
);


function executeInOrder(...fnList){
    fnList.forEach(fn => proceed(fn))
}

function cleanDirectory(dir){
    return () => {
        const entries = fs.readdirSync(constants.DIST_PATH, {
            withFileTypes: true
        });

        for (const entry of entries) {
            if (!entry.name.match(/^\.|\..$/) && !entry.isDirectory()) {
                console.log(entry.name);
            }
        }
    }
}

function compileMainProcess(){
    exec(`npx tsc -p ${path.join(constants.ROOT_PATH, 'tsconfig.json')} `);
}

function compileRenderProcess(){
    exec(`npx tsc -p ${path.join(constants.ROOT_PATH, 'src/render/', 'tsconfig.json')}`);
}


function copyAssets(){
    copy(path.join(constants.SRC_PATH, 'render', 'index.html'), path.join(constants.DIST_PATH, 'public'));
    xcopy(path.join(constants.SRC_PATH, 'render/lib'), path.join(constants.DIST_PATH, 'public/lib'));
}

function copy(from, to){
    exec(`copy /Y ${from} ${to}`)
}

function xcopy(from, to){
    exec(`xcopy /E /Y ${from} ${to}`)
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
        fn();
    } catch(e) {
        console.group('ERROR');
        console.error(e);
        console.groupEnd();
        throw e;
    } finally {
        console.groupEnd();
    }
}

function exec(command, options = {}){
    console.log(`executing command ${command}`);

    child_process.execSync(command, {
        cwd: constants.ROOT_PATH,
        stdio: [process.stdin, process.stdout, process.stderr],
        ...options
    });
}



