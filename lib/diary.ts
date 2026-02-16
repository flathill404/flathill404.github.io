import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIARY_DIR = path.join(process.cwd(), "content", "diary");

export type DiaryEntry = {
	slug: string;
	title: string;
	date: string;
};

export type DiaryEntryWithHtml = DiaryEntry & {
	html: string;
};

export function getDiarySlugs(): string[] {
	if (!fs.existsSync(DIARY_DIR)) return [];
	return fs
		.readdirSync(DIARY_DIR)
		.filter((file) => file.endsWith(".md"))
		.map((file) => file.replace(/\.md$/, ""));
}

export function getAllDiaryEntries(): DiaryEntry[] {
	const slugs = getDiarySlugs();
	return slugs
		.map((slug) => {
			const filePath = path.join(DIARY_DIR, `${slug}.md`);
			const fileContent = fs.readFileSync(filePath, "utf-8");
			const { data } = matter(fileContent);
			return {
				slug,
				title: (data.title as string) || slug,
				date: slug,
			};
		})
		.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getDiaryEntry(
	slug: string,
): Promise<DiaryEntryWithHtml | null> {
	const filePath = path.join(DIARY_DIR, `${slug}.md`);
	if (!fs.existsSync(filePath)) return null;

	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContent);
	const html = await marked(content);

	return {
		slug,
		title: (data.title as string) || slug,
		date: slug,
		html,
	};
}
