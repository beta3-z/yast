import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import {getConnection} from 'oracledb';

function createWindow() {
    const indexPath = path.join(path.resolve('./public/'), 'index.html');
    const window = new BrowserWindow({
        width: 1024,
        height: 768
    });

    console.log(indexPath);

    window.loadFile(indexPath);

    window.webContents.openDevTools();

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