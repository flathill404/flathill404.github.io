import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "flathill404のホームページ",
	description: "flathill404の個人ホームページへようこそ！",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${geistMono.variable}`}>
				<div className="max-w-[640px] mx-auto px-4 py-2 min-h-screen">
					<Header />
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
