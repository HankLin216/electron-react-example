/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import ILog from 'types/Log';
import moment from 'moment';
import net from 'net';
import ISqliteHandler from 'types/SqliteHandler';
import { ActionEnum } from '../enum/Action';
import DeviceList from './data/Devices';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import SqliteHandler from './handlers/SqliteHandler';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(`print log from main => ${msgTemplate(arg)}`);
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1300,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */
let server: net.Server;
ipcMain.on('inital', async () => {
  // inital sqlite
  mainWindow?.webContents.send('system-message', {
    time: moment().toDate(),
    messgae: '(main process) inital sqlite db',
    level: ActionEnum.Info,
  } as ILog);
  const sqliteAbsPath = path.join(__dirname, './data', 'db.sqlite');
  const dbHandler: ISqliteHandler = new SqliteHandler(sqliteAbsPath);
  await dbHandler.createTable();

  // scan device
  mainWindow?.webContents.send('system-message', {
    time: moment().toDate(),
    messgae: '(main process) start scan deivce',
    level: ActionEnum.Info,
  } as ILog);

  // pending 5s
  function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  await sleep(5 * 1000);
  mainWindow?.webContents.send('inital-dev', DeviceList.slice(0, 1));

  mainWindow?.webContents.send('system-message', {
    time: moment().toDate(),
    messgae: '(main process) scan deivce success',
    level: ActionEnum.Success,
  } as ILog);

  mainWindow?.webContents.send('system-message', {
    time: moment().toDate(),
    messgae: '(main process) enable tcp/ip server',
    level: ActionEnum.Info,
  } as ILog);

  // tcp server
  if (server === undefined) {
    server = net.createServer((socket) => {
      // new client
      mainWindow?.webContents.send('system-message', {
        time: moment().toDate(),
        messgae: '(tcp server) new client is connect',
        level: ActionEnum.Info,
      } as ILog);

      socket.setEncoding('utf8');

      socket.on('data', async (data) => {
        mainWindow?.webContents.send('system-message', {
          time: moment().toDate(),
          messgae: `(tcp server) Received data from client: ${data}`,
          level: ActionEnum.Info,
        } as ILog);

        if (data.toString().trim() === 'hello') {
          socket.write("what's your name?");

          const clientName = await new Promise((resolve) => {
            socket.once('data', resolve);
          });

          const name = (clientName as Buffer).toString().trim();
          socket.write(`Hello ${name}`);

          mainWindow?.webContents.send('system-message', {
            time: moment().toDate(),
            messgae: `(tcp server) get client name: ${name}`,
            level: ActionEnum.Info,
          } as ILog);
        }
      });

      socket.on('close', () => {
        console.log('Client disconnected');
        mainWindow?.webContents.send('system-message', {
          time: moment().toDate(),
          messgae: `(tcp server) Client disconnected`,
          level: ActionEnum.Info,
        } as ILog);
      });
    });

    const port = 19999;
    server.listen(port, () => {
      mainWindow?.webContents.send('system-message', {
        time: moment().toDate(),
        messgae: `(tcp server) Server listening on port ${port}`,
        level: ActionEnum.Success,
      } as ILog);
    });
  }

  // test sys log
  setInterval(() => {
    mainWindow?.webContents.send('system-message', {
      time: moment().toDate(),
      messgae: `Test`,
      level: ActionEnum.Info,
    } as ILog);
  }, 0.5 * 1000);
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
