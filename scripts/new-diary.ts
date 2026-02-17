import fs from "node:fs";
import path from "node:path";

function todayLocal(): string {
	const now = new Date();
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, "0");
	const d = String(now.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

const date = process.argv[2] ?? todayLocal();

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
	console.error("Invalid date format. Expected: YYYY-MM-DD");
	process.exit(1);
}

const dir = path.join(process.cwd(), "content", "diary", date);

if (fs.existsSync(dir)) {
	console.error(`Already exists: ${dir}`);
	process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });

const content = `---
title: ""
---

`;

fs.writeFileSync(path.join(dir, "index.md"), content);
console.log(`Created: content/diary/${date}/index.md`);
