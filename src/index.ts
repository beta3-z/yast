import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import {getConnection} from 'oracledb';

function createWindow() {
    const indexPath = path.join(path.resolve('./'), 'index.html');
    const window = new BrowserWindow({
        width: 1024,
        height: 768
    });

    console.log(process.env);

    console.log(indexPath);

    window.loadFile(indexPath);

    getConnection(
        {
            user: 'SIEBEL',
            password: 'SIEBEL',
            connectString: 'LOCAL_XE'
        },
        (err, connection) => {
            if(!err) connection.close();

            console.log('hello there');
        }
    );
}

app.on('ready', createWindow);