# 常明燈 Lasting Lamp — 官方網站

「常明燈」是一款純公益、完全免費、無廣告、完全離線的臨終助念念佛 iOS App。本倉庫為其展示網站與 App Store 所需的支援 / 隱私政策頁面。

## 頁面

| 檔案 | 內容 |
| --- | --- |
| `index.html` | 首頁:App 介紹、功能、隱私承諾 |
| `support.html` | 使用說明與常見問題(App Store 支援網址) |
| `privacy.html` | 隱私政策(App Store 隱私政策網址) |
| `404.html` | 找不到頁面 |

## 技術說明

- 純靜態 HTML,無建置流程、無外部相依(不載入任何第三方字型、腳本或樣式)。
- 各頁樣式內嵌,共用同一組 CSS 變數色票,支援深色模式(`prefers-color-scheme`)與減少動態效果(`prefers-reduced-motion`)。
- 直接以任何靜態伺服器預覽,例如:

```sh
python3 -m http.server 8000
# 瀏覽 http://localhost:8000
```

## 聯絡

gijirokuman@gmail.com
