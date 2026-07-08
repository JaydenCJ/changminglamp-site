// 內部連結檢查：掃描根目錄所有 HTML 的 href / src，確認本地目標檔案存在。
// 外部連結（http/https/協定相對）與 mailto、tel、data、純錨點一律略過。
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// GitHub Pages 專案子路徑：404.html 會在任意深度渲染，使用此前綴的絕對路徑
const SITE_PREFIX = "/changminglamp-site/";
const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));

const htmlFiles = readdirSync(root).filter((f) => f.endsWith(".html"));
const attrPattern = /(?:href|src)\s*=\s*"([^"]*)"/g;
const problems = [];
let checked = 0;

for (const file of htmlFiles) {
  const text = readFileSync(join(root, file), "utf8");
  for (const match of text.matchAll(attrPattern)) {
    const raw = match[1].trim();
    if (raw === "") {
      problems.push(`${file}: 空的 href/src`);
      continue;
    }
    if (/^(?:https?:)?\/\//i.test(raw)) continue; // 外部連結
    if (/^(?:mailto|tel|data|javascript):/i.test(raw)) continue;
    if (raw.startsWith("#")) continue; // 純頁內錨點

    const path = raw.split("#")[0].split("?")[0];
    if (path === "") continue;

    let target;
    if (path.startsWith(SITE_PREFIX)) {
      target = join(root, path.slice(SITE_PREFIX.length));
    } else if (path.startsWith("/")) {
      problems.push(`${file}: 絕對路徑未使用站點前綴 ${SITE_PREFIX} → ${raw}`);
      continue;
    } else {
      target = join(root, path);
    }
    if (existsSync(target) && statSync(target).isDirectory()) {
      target = join(target, "index.html");
    }
    checked += 1;
    if (!existsSync(target)) {
      problems.push(`${file}: 連結目標不存在 → ${raw}`);
    }
  }
}

if (problems.length > 0) {
  console.error(`內部連結檢查失敗（${problems.length} 個問題）：`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`內部連結檢查通過：${htmlFiles.length} 個頁面、${checked} 個本地連結目標全部存在。`);
