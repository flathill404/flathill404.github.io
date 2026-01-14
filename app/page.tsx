"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Skill Data Structure
type Skill = {
	name: string;
	icon: string; // Path to SVG
	color?: string; // Kept for text color or other uses, though SVGs are colored
};

type SkillCategory = {
	title: string;
	skills: Skill[];
};

const skillCategories: SkillCategory[] = [
	{
		title: "Programming Languages",
		skills: [
			{ name: "PHP", icon: "/icons/php.svg", color: "#777BB3" },
			{ name: "TypeScript", icon: "/icons/typescript.svg", color: "#3178C6" },
			{ name: "JavaScript", icon: "/icons/javascript.svg", color: "#F7DF1E" },
			{ name: "Python", icon: "/icons/python.svg", color: "#306998" },
			{ name: "Java", icon: "/icons/java.svg", color: "#007396" },
			{ name: "C#", icon: "/icons/csharp.svg", color: "#9179E4" },
			{ name: "Go", icon: "/icons/go.svg", color: "#00ADD8" },
			{ name: "Dart", icon: "/icons/dart.svg", color: "#0175C2" },
			{ name: "Bash", icon: "/icons/bash.svg", color: "#4EAA25" },
		],
	},
	{
		title: "Backend",
		skills: [
			{ name: "Laravel", icon: "/icons/laravel.svg", color: "#FF2D20" },
			{ name: "WordPress", icon: "/icons/wordpress.svg", color: "#21759B" },
			{ name: "Spring Boot", icon: "/icons/spring.svg", color: "#6DB33F" },
			{ name: "ASP.NET Core", icon: "/icons/dotnetcore.svg", color: "#512BD4" },
			{ name: "Django", icon: "/icons/django.svg", color: "#092E20" },
			{ name: "Flask", icon: "/icons/flask.svg", color: "#000000" },
			{ name: "FastAPI", icon: "/icons/fastapi.svg", color: "#009688" },
			{ name: "Node.js", icon: "/icons/nodejs.svg", color: "#339933" },
			{ name: "Express", icon: "/icons/express.svg", color: "#000000" },
			{ name: "Prisma", icon: "/icons/prisma.svg", color: "#2D3748" },
		],
	},
	{
		title: "Frontend",
		skills: [
			{ name: "React", icon: "/icons/react.svg", color: "#61DAFB" },
			{ name: "Next.js", icon: "/icons/nextjs.svg", color: "#000000" },
			{ name: "Vue.js", icon: "/icons/vuejs.svg", color: "#4FC08D" },
			{ name: "Nuxt", icon: "/icons/nuxtjs.svg", color: "#00DC82" },
			{ name: "jQuery", icon: "/icons/jquery.svg", color: "#0769AD" },
			{ name: "Flutter", icon: "/icons/flutter.svg", color: "#02569B" },
			{ name: "Electron", icon: "/icons/electron.svg", color: "#47848F" },
			{ name: "HTML5", icon: "/icons/html5.svg", color: "#E34F26" },
			{ name: "CSS3", icon: "/icons/css3.svg", color: "#1572B6" },
			{
				name: "Tailwind CSS",
				icon: "/icons/tailwindcss.svg",
				color: "#06B6D4",
			},
			{ name: "Bootstrap", icon: "/icons/bootstrap.svg", color: "#7952B3" },
			{ name: "Sass", icon: "/icons/sass.svg", color: "#CC6699" },
			{
				name: "Styled Comp",
				icon: "/icons/styledcomponents.svg",
				color: "#DB7093",
			},
			{ name: "Vite", icon: "/icons/vitejs.svg", color: "#646CFF" },
			{ name: "Webpack", icon: "/icons/webpack.svg", color: "#8DD6F9" },
		],
	},
	{
		title: "Database & Infrastructure",
		skills: [
			{ name: "MySQL", icon: "/icons/mysql.svg", color: "#4479A1" },
			{ name: "PostgreSQL", icon: "/icons/postgresql.svg", color: "#4169E1" },
			{ name: "Oracle DB", icon: "/icons/oracle.svg", color: "#F80000" },
			{ name: "SQLite", icon: "/icons/sqlite.svg", color: "#003B57" },
			{ name: "Redis", icon: "/icons/redis.svg", color: "#DC382D" },
			{ name: "Firebase", icon: "/icons/firebase.svg", color: "#FFCA28" },
			{ name: "AWS", icon: "/icons/aws.svg", color: "#FF9900" },
			{ name: "GCP", icon: "/icons/gcp.svg", color: "#4285F4" },
			{ name: "Cloudflare", icon: "/icons/cloudflare.svg", color: "#F38020" },
			{ name: "Docker", icon: "/icons/docker.svg", color: "#2496ED" },
			{ name: "Nginx", icon: "/icons/nginx.svg", color: "#009639" },
			{ name: "Apache", icon: "/icons/apache.svg", color: "#D22128" },
			{ name: "Jenkins", icon: "/icons/jenkins.svg", color: "#D24939" },
		],
	},
	{
		title: "Tools & Environment",
		skills: [
			{ name: "Linux", icon: "/icons/linux.svg", color: "#FCC624" },
			{ name: "macOS", icon: "/icons/apple.svg", color: "#000000" },
			{ name: "Windows", icon: "/icons/windows.svg", color: "#0078D6" },
			{ name: "Git", icon: "/icons/git.svg", color: "#F05032" },
			{ name: "Jira", icon: "/icons/jira.svg", color: "#0052CC" },
			{ name: "Confluence", icon: "/icons/confluence.svg", color: "#172B4D" },
			{ name: "Slack", icon: "/icons/slack.svg", color: "#4A154B" },
			{ name: "Postman", icon: "/icons/postman.svg", color: "#FF6C37" },
			{ name: "Sentry", icon: "/icons/sentry.svg", color: "#362D59" },
			{ name: "VS Code", icon: "/icons/vscode.svg", color: "#007ACC" },
			{
				name: "Visual Studio",
				icon: "/icons/visualstudio.svg",
				color: "#5C2D91",
			},
		],
	},
];

export default function Home() {
	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30">
			{/* Background Gradients */}
			<div className="fixed inset-0 pointer-events-none">
				<div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
				<div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />
				<div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen" />
			</div>

			<main className="relative z-10 container mx-auto px-4 py-20 max-w-6xl">
				{/* Hero Section */}
				<section className="flex flex-col items-center text-center mb-24">
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ type: "spring", stiffness: 260, damping: 20 }}
						className="mb-8 relative"
					>
						<div className="w-40 h-40 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500">
							<div className="rounded-full overflow-hidden w-full h-full bg-black relative">
								<Image
									src="/images/ducks/duck.webp"
									alt="flathill404"
									fill
									className="object-cover"
									priority
								/>
							</div>
						</div>
						{/* Glow effect under avatar */}
						<div className="absolute -inset-4 bg-gradient-to-br from-purple-600 to-blue-600 opacity-30 blur-2xl -z-10 rounded-full" />
					</motion.div>

					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						<h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
							flathill404
						</h1>
						<p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
							Full Stack Developer
						</p>
					</motion.div>

					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="flex gap-6"
					>
						<a
							href="https://github.com/flathill404"
							target="_blank"
							rel="noopener noreferrer"
							className="p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-110 active:scale-95 border border-white/10"
							aria-label="GitHub"
						>
							<div className="w-6 h-6 relative">
								<Image
									src="/icons/github-white.svg"
									alt="GitHub"
									fill
									className="object-contain"
								/>
							</div>
						</a>
						<a
							href="https://x.com/flathill404"
							target="_blank"
							rel="noopener noreferrer"
							className="p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-110 active:scale-95 border border-white/10"
							aria-label="X (Twitter)"
						>
							<div className="w-6 h-6 relative">
								<Image
									src="/icons/twitter-white.svg"
									alt="X (Twitter)"
									fill
									className="object-contain"
								/>
							</div>
						</a>
					</motion.div>
				</section>

				{/* Skills Section */}
				<section className="space-y-12">
					{skillCategories.map((category, index) => (
						<motion.div
							key={category.title}
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ delay: index * 0.1 }}
						>
							<h2 className="text-2xl md:text-3xl font-bold mb-8 pl-4 border-l-4 border-purple-500 text-gray-100">
								{category.title}
							</h2>

							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
								{category.skills.map((skill) => (
									<motion.div
										key={skill.name}
										whileHover={{
											scale: 1.05,
											backgroundColor: "rgba(255, 255, 255, 0.1)",
										}}
										className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-white/20 transition-colors group cursor-default"
									>
										<div className="relative w-12 h-12 mb-3 transition-transform group-hover:rotate-12 duration-300">
											<Image
												src={skill.icon}
												alt={skill.name}
												fill
												className="object-contain"
											/>
										</div>
										<span className="text-sm font-medium text-gray-300 group-hover:text-white text-center">
											{skill.name}
										</span>
									</motion.div>
								))}
							</div>
						</motion.div>
					))}
				</section>
			</main>
		</div>
	);
}
