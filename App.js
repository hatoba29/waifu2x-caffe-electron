const { app, BrowserWindow, ipcMain } = require("electron")
const isDev = require("electron-is-dev")
const path = require("path")

// 1. GC가 일어나지 않도록 밖에 빼줌
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // 3. and load the index.html of the app.
  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    win.loadURL("http://localhost:3000")
    win.webContents.openDevTools()
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    win.loadFile(path.join(__dirname, "./build/index.html"))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit()
})

// handle for window controls
let focused = BrowserWindow.getFocusedWindow()
app.on("browser-window-focus", () => {
  focused = BrowserWindow.getFocusedWindow()
})

ipcMain.handle("close", () => app.quit())
ipcMain.handle("minimize", () => focused.minimize())
ipcMain.handle("maximize", () => {
  if (focused.isMaximized()) {
    focused.unmaximize()
  } else {
    focused.maximize()
  }
})
