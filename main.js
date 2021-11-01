const { app, BrowserWindow } = require('electron')
function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      title:" Data visualiser",
    })
    win.loadFile('Webpages/index.html')

    // win.loadURL('https://code.visualstudio.com/docs/editor/integrated-terminal')
}
app.whenReady().then(() => {
    createWindow()
  })
 
// learn electron JS theory and stuff
// typically this is the only file that make electron JS an App
// everything else is very similiar to the JS web ecosysystem
