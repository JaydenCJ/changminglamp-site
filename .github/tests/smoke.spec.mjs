// 渲染冒煙測試：明 / 暗兩種配色 × 320px / 390px 兩種寬度，
// 逐頁斷言（1）無水平溢出（2）無主控台錯誤。
import { test, expect } from "@playwright/test";

const pages = ["index.html", "support.html", "privacy.html", "404.html"];
const colorSchemes = ["light", "dark"];
const widths = [320, 390];

for (const colorScheme of colorSchemes) {
  for (const width of widths) {
    for (const path of pages) {
      test(`${path} · ${colorScheme} · ${width}px：無水平溢出、無主控台錯誤`, async ({ page }) => {
        const errors = [];
        page.on("console", (msg) => {
          if (msg.type() === "error") errors.push(msg.text());
        });
        page.on("pageerror", (err) => errors.push(String(err)));

        await page.emulateMedia({ colorScheme });
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path, { waitUntil: "load" });

        const overflow = await page.evaluate(
          () => document.scrollingElement.scrollWidth - window.innerWidth
        );
        expect(overflow, "頁面不應出現水平溢出").toBeLessThanOrEqual(0);
        expect(errors, "主控台不應出現錯誤").toEqual([]);
      });
    }
  }
}
