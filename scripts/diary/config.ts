import path from "node:path";

export interface DiaryConfig {
	contentDir: string;
	publicDir: string;
}

export function getConfig(): DiaryConfig {
	const cwd = process.cwd();
	return {
		contentDir: path.join(cwd, "content", "diary"),
		publicDir: path.join(cwd, "public", "diary"),
	};
}
