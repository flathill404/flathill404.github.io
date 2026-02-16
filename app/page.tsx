import Image from "next/image";

type Skill = {
	name: string;
	icon: string;
};

type SkillCategory = {
	title: string;
	skills: Skill[];
};

const skillCategories: SkillCategory[] = [
	{
		title: "プログラミング言語",
		skills: [
			{ name: "PHP", icon: "/icons/php.svg" },
			{ name: "TypeScript", icon: "/icons/typescript.svg" },
			{ name: "JavaScript", icon: "/icons/javascript.svg" },
			{ name: "Python", icon: "/icons/python.svg" },
			{ name: "Java", icon: "/icons/java.svg" },
			{ name: "C#", icon: "/icons/csharp.svg" },
			{ name: "Go", icon: "/icons/go.svg" },
			{ name: "Dart", icon: "/icons/dart.svg" },
			{ name: "Bash", icon: "/icons/bash.svg" },
		],
	},
	{
		title: "バックエンド",
		skills: [
			{ name: "Laravel", icon: "/icons/laravel.svg" },
			{ name: "WordPress", icon: "/icons/wordpress.svg" },
			{ name: "Spring Boot", icon: "/icons/spring.svg" },
			{ name: "ASP.NET Core", icon: "/icons/dotnetcore.svg" },
			{ name: "Django", icon: "/icons/django.svg" },
			{ name: "Flask", icon: "/icons/flask.svg" },
			{ name: "FastAPI", icon: "/icons/fastapi.svg" },
			{ name: "Node.js", icon: "/icons/nodejs.svg" },
			{ name: "Express", icon: "/icons/express.svg" },
			{ name: "Prisma", icon: "/icons/prisma.svg" },
		],
	},
	{
		title: "フロントエンド",
		skills: [
			{ name: "React", icon: "/icons/react.svg" },
			{ name: "Next.js", icon: "/icons/nextjs.svg" },
			{ name: "Vue.js", icon: "/icons/vuejs.svg" },
			{ name: "Nuxt", icon: "/icons/nuxtjs.svg" },
			{ name: "jQuery", icon: "/icons/jquery.svg" },
			{ name: "Flutter", icon: "/icons/flutter.svg" },
			{ name: "Electron", icon: "/icons/electron.svg" },
			{ name: "HTML5", icon: "/icons/html5.svg" },
			{ name: "CSS3", icon: "/icons/css3.svg" },
			{ name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
			{ name: "Bootstrap", icon: "/icons/bootstrap.svg" },
			{ name: "Sass", icon: "/icons/sass.svg" },
			{ name: "Styled Comp", icon: "/icons/styledcomponents.svg" },
			{ name: "Vite", icon: "/icons/vitejs.svg" },
			{ name: "Webpack", icon: "/icons/webpack.svg" },
		],
	},
	{
		title: "データベース & インフラ",
		skills: [
			{ name: "MySQL", icon: "/icons/mysql.svg" },
			{ name: "PostgreSQL", icon: "/icons/postgresql.svg" },
			{ name: "Oracle DB", icon: "/icons/oracle.svg" },
			{ name: "SQLite", icon: "/icons/sqlite.svg" },
			{ name: "Redis", icon: "/icons/redis.svg" },
			{ name: "Firebase", icon: "/icons/firebase.svg" },
			{ name: "AWS", icon: "/icons/aws.svg" },
			{ name: "GCP", icon: "/icons/gcp.svg" },
			{ name: "Cloudflare", icon: "/icons/cloudflare.svg" },
			{ name: "Docker", icon: "/icons/docker.svg" },
			{ name: "Nginx", icon: "/icons/nginx.svg" },
			{ name: "Apache", icon: "/icons/apache.svg" },
			{ name: "Jenkins", icon: "/icons/jenkins.svg" },
		],
	},
	{
		title: "ツール & 環境",
		skills: [
			{ name: "Linux", icon: "/icons/linux.svg" },
			{ name: "macOS", icon: "/icons/apple.svg" },
			{ name: "Windows", icon: "/icons/windows.svg" },
			{ name: "Git", icon: "/icons/git.svg" },
			{ name: "Jira", icon: "/icons/jira.svg" },
			{ name: "Confluence", icon: "/icons/confluence.svg" },
			{ name: "Slack", icon: "/icons/slack.svg" },
			{ name: "Postman", icon: "/icons/postman.svg" },
			{ name: "Sentry", icon: "/icons/sentry.svg" },
			{ name: "VS Code", icon: "/icons/vscode.svg" },
			{ name: "Visual Studio", icon: "/icons/visualstudio.svg" },
		],
	},
];

export default function Home() {
	return (
		<div className="space-y-6">
			{/* 自己紹介 */}
			<section>
				<h2 className="text-center text-accent-yellow font-bold my-4">
					★ 自己紹介（じこしょうかい） ★
				</h2>
				<div className="border-2 border-accent-pink p-4">
					<table className="mx-auto text-sm">
						<tbody>
							<tr>
								<td className="text-accent-cyan pr-4 py-1 align-top">
									■ ハンドルネーム
								</td>
								<td className="py-1">flathill404</td>
							</tr>
							<tr>
								<td className="text-accent-cyan pr-4 py-1 align-top">■ 職業</td>
								<td className="py-1">フルスタックエンジニア</td>
							</tr>
							<tr>
								<td className="text-accent-cyan pr-4 py-1 align-top">■ 趣味</td>
								<td className="py-1">プログラミング、読書、音楽</td>
							</tr>
							<tr>
								<td className="text-accent-cyan pr-4 py-1 align-top">
									■ 好きなもの
								</td>
								<td className="py-1">平成のインターネット</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* スキル一覧 */}
			<section>
				<h2 className="text-center text-accent-yellow font-bold my-4">
					★ スキル一覧 ★
				</h2>

				{skillCategories.map((category) => (
					<div key={category.title} className="mb-6">
						<h3 className="text-accent-lime font-bold text-sm mb-2">
							【{category.title}】
						</h3>
						<div className="flex flex-wrap gap-2">
							{category.skills.map((skill) => (
								<span
									key={skill.name}
									className="inline-flex items-center gap-1 text-xs border border-accent-cyan/30 px-2 py-1"
								>
									<Image
										src={skill.icon}
										alt={skill.name}
										width={16}
										height={16}
										className="inline"
									/>
									{skill.name}
								</span>
							))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
}
