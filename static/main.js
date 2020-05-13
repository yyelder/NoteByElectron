// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
let tray = null
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  mainWindow.webContents.openDevTools()
  // and load the index.html of the app.
  mainWindow.loadFile('src/page.html')
    // mainWindow.loadFile('test/wf.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    tray = new Tray('./icon/favicon.ico');
    mainWindow.setMenu(null)
    // event.preventDefault();
    mainWindow.on('close', (event) => {
      mainWindow.hide();
      mainWindow.setSkipTaskbar(true);
      event.preventDefault();
    });
    mainWindow.on('show', () => {
      tray.setHighlightMode('always')
    })
    mainWindow.on('hide', () => {
      tray.setHighlightMode('never')
    })
    //创建系统通知区菜单
    const contextMenu = Menu.buildFromTemplate([
      { label: '退出', click: () => { mainWindow.destroy() } },//我们需要在这里有一个真正的退出（这里直接强制退出）
    ])
    tray.setToolTip('My托盘测试')
    tray.setContextMenu(contextMenu)
    tray.on('click', () => { //我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
      mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true);
    })


  }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
