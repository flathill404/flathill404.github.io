import fs from "node:fs";
import path from "node:path";
import type { ICommand } from "../types";
import type { DiaryConfig } from "../config";

export class CopyAssetsCommand implements ICommand {
	name = "copy-assets";
	description =
		"Copy non-markdown files (like images) from the content diary directory to the public directory";

	execute(_args: string[], config: DiaryConfig): void {
		// Clean previous copies
		if (fs.existsSync(config.publicDir)) {
			fs.rmSync(config.publicDir, { recursive: true });
		}

		if (!fs.existsSync(config.contentDir)) {
			console.log(`No diary content directory found at: ${config.contentDir}`);
			return; // Graceful exit
		}

		const entries = fs
			.readdirSync(config.contentDir, { withFileTypes: true })
			.filter((e) => e.isDirectory());

		for (const entry of entries) {
			const srcDir = path.join(config.contentDir, entry.name);
			const files = fs.readdirSync(srcDir).filter((f) => !f.endsWith(".md"));

			if (files.length === 0) continue;

			const destDir = path.join(config.publicDir, entry.name);
			fs.mkdirSync(destDir, { recursive: true });

			for (const file of files) {
				const srcPath = path.join(srcDir, file);
				const destPath = path.join(destDir, file);
				fs.copyFileSync(srcPath, destPath);
			}
		}
	}
}
