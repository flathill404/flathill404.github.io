import fs from "node:fs";
import path from "node:path";
import type { DiaryConfig } from "../config";
import type { ICommand } from "../types";

export class GenCommand implements ICommand {
	name = "gen";
	description =
		"Create a new diary entry directory and index.md for the given date (default: today)";

	private todayLocal(): string {
		const now = new Date();
		const y = now.getFullYear();
		const m = String(now.getMonth() + 1).padStart(2, "0");
		const d = String(now.getDate()).padStart(2, "0");
		return `${y}-${m}-${d}`;
	}

	execute(args: string[], config: DiaryConfig): void {
		const date = args[0] ?? this.todayLocal();

		if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			console.error("Invalid date format. Expected: YYYY-MM-DD");
			process.exit(1);
		}

		const dir = path.join(config.contentDir, date);

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
		console.log(
			`Created: ${path.relative(process.cwd(), path.join(dir, "index.md"))}`,
		);
	}
}
