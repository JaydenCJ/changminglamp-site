// 渲染冒煙測試設定：以 python3 靜態伺服器模擬 GitHub Pages 專案子路徑。
// 倉庫根目錄下建立 changminglamp-site -> . 的符號連結（已列入 .gitignore），
// 使 404.html 內 /changminglamp-site/ 前綴的絕對路徑也能正確解析。
import { defineConfig } from "@playwright/test";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
// 本地瀏覽器版本與 Playwright 期望不一致時，可用環境變數指定 Chromium 執行檔
const executablePath = process.env.CHROMIUM_EXECUTABLE;

export default defineConfig({
  testDir: fileURLToPath(new URL(".", import.meta.url)),
  timeout: 30_000,
  reporter: [["list"]],
  use: {
    browserName: "chromium",
    baseURL: "http://127.0.0.1:8181/changminglamp-site/",
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  webServer: {
    command: 'sh -c "ln -sfn . changminglamp-site && python3 -m http.server 8181 --bind 127.0.0.1"',
    url: "http://127.0.0.1:8181/changminglamp-site/index.html",
    cwd: repoRoot,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
