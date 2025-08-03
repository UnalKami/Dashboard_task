const {BrowserWindow, app} = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';

const  createMainWindow = () => {
    const win = new BrowserWindow({
        title: "Dashboard task",
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile("frontend/templates/calendar.html")
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length==0) {
            createMainWindow();
        }
    })
});

app.on('window-all-closed', () => {
    if (!isMac) app.quit()
})