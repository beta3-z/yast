import {app, BrowserWindow} from 'electron';
import * as path from 'path';

function createWindow() : void {
    const indexPath: string = path.join(path.resolve('./'), 'index.html');
    const window: BrowserWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    console.log(indexPath);

    window.loadFile(indexPath);
}

app.on('ready', createWindow);