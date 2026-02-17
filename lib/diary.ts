import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

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
		.readdirSync(DIARY_DIR, { withFileTypes: true })
		.filter(
			(entry) =>
				entry.isDirectory() &&
				fs.existsSync(path.join(DIARY_DIR, entry.name, "index.md")),
		)
		.map((entry) => entry.name);
}

export function getAllDiaryEntries(): DiaryEntry[] {
	const slugs = getDiarySlugs();
	return slugs
		.map((slug) => {
			const filePath = path.join(DIARY_DIR, slug, "index.md");
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
	const filePath = path.join(DIARY_DIR, slug, "index.md");
	if (!fs.existsSync(filePath)) return null;

	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContent);

	const marked = new Marked({
		renderer: {
			image({ href, title, text }) {
				const src =
					href && !href.startsWith("http") && !href.startsWith("/")
						? `/diary/${slug}/${href}`
						: href;
				const titleAttr = title ? ` title="${title}"` : "";
				return `<img src="${src}" alt="${text}"${titleAttr} />`;
			},
		},
	});

	const html = await marked.parse(content);

	return {
		slug,
		title: (data.title as string) || slug,
		date: slug,
		html,
	};
}
