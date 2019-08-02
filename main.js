const { app, BrowserWindow } = require('electron')
const path = require('path')
const {ipcMain} = require('electron')

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let theorem
let open = false;
const modalPath = path.join('file://',__dirname, 'theorem.html')



function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('./src/index.html')
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
	
  theorem = new BrowserWindow({
    frame: false,
    width: 600,
    height: 800,
    show: false,
    webPreferences:{nodeIntegration:true}
  })
  theorem.loadFile('./src/theorem.html')
  theorem.on('closed', function() { theorem = null })
	
  ipcMain.on('resize', function() {
	  !open ? theorem.show : console.log("theorem is showing");
      win.setSize(775,614);
	  open = !open;
	  console.log('open is ' + open);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
