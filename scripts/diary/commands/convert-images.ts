import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import type { DiaryConfig } from "../config";
import type { ICommand } from "../types";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".tiff", ".avif"]);

export class ConvertImagesCommand implements ICommand {
	name = "convert-images";
	description =
		"Convert images in the diary directory to WebP format and update references in index.md";

	async execute(_args: string[], config: DiaryConfig): Promise<void> {
		if (!fs.existsSync(config.contentDir)) {
			console.log("No diary directory found.");
			return;
		}

		const dirs = fs
			.readdirSync(config.contentDir, { withFileTypes: true })
			.filter((e) => e.isDirectory());

		let converted = 0;

		for (const dir of dirs) {
			const dirPath = path.join(config.contentDir, dir.name);
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
	}
}
