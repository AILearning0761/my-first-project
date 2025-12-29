import { app, BrowserWindow, dialog } from "electron";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === "development";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: "#000000",
    webPreferences: {
      contextIsolation: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    const indexPath = path.join(__dirname, "../dist/index.html");

    if (!existsSync(indexPath)) {
      dialog.showErrorBox(
        "Renderer build missing",
        "We could not find dist/index.html. Run `npm run build` before starting Electron."
      );
      app.quit();
      return;
    }

    mainWindow.loadFile(indexPath);
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
