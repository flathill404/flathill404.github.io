"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaGithub, FaTimes, FaTwitter } from "react-icons/fa";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);
	const closeMenu = () => setIsOpen(false);

	return (
		<header className="w-full border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
			<div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-md -z-10" />

			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link
					href="/"
					className="font-bold text-xl tracking-tight flex items-center gap-2 z-[60]"
					onClick={closeMenu}
				>
					<Image
						src="/images/ducks/duck.webp"
						alt="Avatar"
						width={32}
						height={32}
						className="rounded-full"
					/>
					flathill404
				</Link>

				<button
					type="button"
					onClick={toggleMenu}
					className="p-2 z-[60] text-gray-800 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded-full transition-colors"
					aria-label="Toggle menu"
				>
					{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
				</button>

				{/* Mobile Menu Overlay */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, x: "100%" }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: "100%" }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							className="fixed top-0 left-0 right-0 bottom-0 bg-white/95 dark:bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-start pt-28"
						>
							<nav className="flex flex-col items-center gap-8 text-2xl font-medium">
								<Link
									href="/"
									className="hover:text-purple-500 transition-colors"
									onClick={closeMenu}
								>
									Home
								</Link>
								<Link
									href="/shelf"
									className="hover:text-purple-500 transition-colors"
									onClick={closeMenu}
								>
									Shelf
								</Link>
								<Link
									href="/tools"
									className="hover:text-purple-500 transition-colors"
									onClick={closeMenu}
								>
									Tools
								</Link>

								<div className="flex gap-8 mt-8">
									<a
										href="https://github.com/flathill404"
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-gray-100 dark:bg-gray-900 rounded-full hover:scale-110 transition-transform"
										aria-label="GitHub"
									>
										<FaGithub size={32} />
									</a>
									<a
										href="https://x.com/flathill404"
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-gray-100 dark:bg-gray-900 rounded-full hover:scale-110 transition-transform"
										aria-label="X (Twitter)"
									>
										<FaTwitter size={32} />
									</a>
								</div>
							</nav>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
}
