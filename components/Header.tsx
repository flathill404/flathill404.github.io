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
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
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

        {/* Desktop Navigation (Optional, can be hidden if only hamburger is desired, 
                    but usually good to have visible links on desktop. 
                    User asked for hamburger menu specifically, so we'll prioritize that, 
                    but maybe show hamburger on all screens or just mobile? 
                    The request: "Header no migiue ni hamburger menu wo setchi shitai" (I want to place a hamburger menu in the top right of the header).
                    It doesn't explicitly say "only for mobile" or "replace standard nav". 
                    I'll treat it as the primary navigation method for now as per the specific request for "hamburger menu". 
                    Or I can keep it simple and just have the hamburger menu always visible or visible on mobile.
                    Let's make the hamburger visible always as requested "hamburger menu in top right".
                */}

        <button
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
              className="fixed inset-0 bg-white dark:bg-black z-50 flex flex-col items-center justify-center"
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
