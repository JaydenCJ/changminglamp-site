# 常明燈 Lasting Lamp — 官方網站

「常明燈」是一款純公益、完全免費、無廣告、完全離線的臨終助念念佛 iOS App。本倉庫為其展示網站與 App Store 所需的支援 / 隱私政策頁面。

## 頁面

| 檔案 | 內容 |
| --- | --- |
| `index.html` | 首頁：App 介紹、功能、隱私承諾 |
| `support.html` | 使用說明與常見問題（App Store 支援網址） |
| `privacy.html` | 隱私政策（App Store 隱私政策網址） |
| `404.html` | 找不到頁面 |

## 技術說明

- 純靜態 HTML，無建置流程、無外部相依（不載入任何第三方字型、腳本或樣式）。
- 共用樣式抽出為 `site.css`（變數色票、頁首、導覽、頁尾），各頁僅內嵌頁面專屬樣式；`404.html` 因會在任意深度的路徑下渲染，維持自足內嵌並使用 `/changminglamp-site/` 前綴的絕對路徑。
- 支援深色模式（`prefers-color-scheme`）與減少動態效果（`prefers-reduced-motion`）。
- 站點以 GitHub Pages 專案子路徑（`https://jaydencj.github.io/changminglamp-site/`）發布：`robots.txt` 只有在綁定自訂網域（或部署至使用者根站點）時才會被搜尋引擎讀取，目前的收錄控制由各頁 `meta robots`、`canonical` 與手動提交的 `sitemap.xml` 承擔。
- 直接以任何靜態伺服器預覽，例如：

```sh
python3 -m http.server 8000
# 瀏覽 http://localhost:8000
```

## 聯絡

gijirokuman@gmail.com
