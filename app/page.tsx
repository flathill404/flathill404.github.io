'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaPhp, FaPython, FaJava, FaAws, FaDocker, FaLinux, FaWindows, FaApple, FaGitAlt, FaSlack, FaDiscord } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiGo, SiDart, SiGnubash, SiLaravel, SiWordpress, SiSpringboot, SiDotnet, SiDjango, SiFlask, SiFastapi, SiNodedotjs, SiExpress, SiPrisma, SiTypeorm, SiReact, SiNextdotjs, SiVuedotjs, SiNuxtdotjs, SiJquery, SiFlutter, SiElectron, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiSass, SiStyledcomponents, SiVite, SiWebpack, SiBabel, SiNpm, SiYarn, SiPnpm, SiBun, SiMysql, SiPostgresql, SiOracle, SiSqlite, SiRedis, SiFirebase, SiGooglecloud, SiCloudflare, SiKubernetes, SiNginx, SiApache, SiJenkins, SiPostman, SiSentry, SiJira, SiConfluence } from 'react-icons/si';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { TbBrandCSharp } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { DiVisualstudio } from 'react-icons/di';

// Skill Data Structure
type Skill = {
  name: string;
  icon: React.ReactNode;
  color?: string;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'PHP', icon: <FaPhp />, color: '#777BB4' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'Python', icon: <FaPython />, color: '#3776AB' },
      { name: 'Java', icon: <FaJava />, color: '#007396' },
      { name: 'C#', icon: <TbBrandCSharp />, color: '##9179E4' },
      { name: 'Go', icon: <SiGo />, color: '#00ADD8' },
      { name: 'Dart', icon: <SiDart />, color: '#0175C2' },
      { name: 'Bash', icon: <SiGnubash />, color: '#4EAA25' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Laravel', icon: <SiLaravel />, color: '#FF2D20' },
      { name: 'WordPress', icon: <SiWordpress />, color: '#21759B' },
      { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6DB33F' },
      { name: 'ASP.NET Core', icon: <SiDotnet />, color: '#512BD4' },
      { name: 'Django', icon: <SiDjango />, color: '#092E20' },
      { name: 'Flask', icon: <SiFlask />, color: '#000000' },
      { name: 'FastAPI', icon: <SiFastapi />, color: '#009688' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
      { name: 'Express', icon: <SiExpress />, color: '#000000' },
      { name: 'Prisma', icon: <SiPrisma />, color: '#2D3748' },
      { name: 'TypeORM', icon: <SiTypeorm />, color: '#FE0808' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <SiReact />, color: '#61DAFB' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
      { name: 'Vue.js', icon: <SiVuedotjs />, color: '#4FC08D' },
      { name: 'Nuxt', icon: <SiNuxtdotjs />, color: '#00DC82' },
      { name: 'jQuery', icon: <SiJquery />, color: '#0769AD' },
      { name: 'Flutter', icon: <SiFlutter />, color: '#02569B' },
      { name: 'Electron', icon: <SiElectron />, color: '#47848F' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
      { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
      { name: 'Bootstrap', icon: <SiBootstrap />, color: '#7952B3' },
      { name: 'Sass', icon: <SiSass />, color: '#CC6699' },
      { name: 'Styled Comp', icon: <SiStyledcomponents />, color: '#DB7093' },
      { name: 'Vite', icon: <SiVite />, color: '#646CFF' },
      { name: 'Webpack', icon: <SiWebpack />, color: '#8DD6F9' },
    ],
  },
  {
    title: 'Database & Infrastructure',
    skills: [
      { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
      { name: 'Oracle DB', icon: <SiOracle />, color: '#F80000' },
      { name: 'SQLite', icon: <SiSqlite />, color: '#003B57' },
      { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
      { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
      { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
      { name: 'GCP', icon: <SiGooglecloud />, color: '#4285F4' },
      { name: 'Cloudflare', icon: <SiCloudflare />, color: '#F38020' },
      { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
      { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326CE5' },
      { name: 'Nginx', icon: <SiNginx />, color: '#009639' },
      { name: 'Apache', icon: <SiApache />, color: '#D22128' },
      { name: 'Jenkins', icon: <SiJenkins />, color: '#D24939' },
    ],
  },
  {
    title: 'Tools & Environment',
    skills: [
      { name: 'Linux', icon: <FaLinux />, color: '#FCC624' },
      { name: 'macOS', icon: <FaApple />, color: '#000000' },
      { name: 'Windows', icon: <FaWindows />, color: '#0078D6' },
      { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
      { name: 'Jira', icon: <SiJira />, color: '#0052CC' },
      { name: 'Confluence', icon: <SiConfluence />, color: '#172B4D' },
      { name: 'Slack', icon: <FaSlack />, color: '#4A154B' },
      { name: 'Discord', icon: <FaDiscord />, color: '#5865F2' },
      { name: 'Teams', icon: <BsMicrosoftTeams />, color: '#6264A7' },
      { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
      { name: 'Sentry', icon: <SiSentry />, color: '#362D59' },
      { name: 'VS Code', icon: <VscVscode />, color: '#007ACC' },
      { name: 'Visual Studio', icon: <DiVisualstudio />, color: '#5C2D91' },
    ]
  }
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
              <FaGithub size={24} />
            </a>
            <a
              href="https://x.com/flathill404"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-110 active:scale-95 border border-white/10"
              aria-label="X (Twitter)"
            >
              <FaTwitter size={24} />
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
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-white/20 transition-colors group cursor-default"
                  >
                    <div
                      className="text-4xl mb-3 transition-transform group-hover:rotate-12 duration-300"
                      style={{ color: skill.color || 'currentColor' }}
                    >
                      {skill.icon}
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