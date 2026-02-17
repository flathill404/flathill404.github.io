import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "diary");
const PUBLIC_DIR = path.join(process.cwd(), "public", "diary");

// Clean previous copies
if (fs.existsSync(PUBLIC_DIR)) {
	fs.rmSync(PUBLIC_DIR, { recursive: true });
}

if (!fs.existsSync(CONTENT_DIR)) {
	process.exit(0);
}

const entries = fs
	.readdirSync(CONTENT_DIR, { withFileTypes: true })
	.filter((e) => e.isDirectory());

for (const entry of entries) {
	const srcDir = path.join(CONTENT_DIR, entry.name);
	const files = fs
		.readdirSync(srcDir)
		.filter((f) => !f.endsWith(".md"));

	if (files.length === 0) continue;

	const destDir = path.join(PUBLIC_DIR, entry.name);
	fs.mkdirSync(destDir, { recursive: true });

	for (const file of files) {
		fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
	}
}
