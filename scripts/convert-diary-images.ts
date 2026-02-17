import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIARY_DIR = path.join(process.cwd(), "content", "diary");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".tiff", ".avif"]);

if (!fs.existsSync(DIARY_DIR)) {
	console.log("No diary directory found.");
	process.exit(0);
}

const dirs = fs
	.readdirSync(DIARY_DIR, { withFileTypes: true })
	.filter((e) => e.isDirectory());

let converted = 0;

for (const dir of dirs) {
	const dirPath = path.join(DIARY_DIR, dir.name);
	const mdPath = path.join(dirPath, "index.md");
	const files = fs.readdirSync(dirPath).filter((f) => {
		const ext = path.extname(f).toLowerCase();
		return IMAGE_EXTS.has(ext);
	});

	if (files.length === 0) continue;

	for (const file of files) {
		const src = path.join(dirPath, file);
		const name = path.parse(file).name;
		const dest = path.join(dirPath, `${name}.webp`);

		await sharp(src).webp({ quality: 80 }).toFile(dest);
		fs.rmSync(src);
		converted++;
		console.log(`Converted: ${dir.name}/${file} -> ${name}.webp`);
	}

	// Update references in index.md
	if (fs.existsSync(mdPath)) {
		let md = fs.readFileSync(mdPath, "utf-8");
		for (const file of files) {
			const name = path.parse(file).name;
			const escaped = file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			md = md.replace(new RegExp(escaped, "g"), `${name}.webp`);
		}
		fs.writeFileSync(mdPath, md);
	}
}

console.log(`Done. ${converted} image(s) converted.`);
