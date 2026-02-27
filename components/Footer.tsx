function getGeekyNumber() {
	const today = new Date();
	const seed =
		today.getFullYear() * 10000 +
		(today.getMonth() + 1) * 100 +
		today.getDate();
	const geekyNumbers = [
		42, // The answer to life, the universe, and everything
		73, // The best number (21st prime)
		403, // HTTP Forbidden
		404, // Not Found (flathill404)
		418, // I'm a teapot
		451, // Unavailable For Legal Reasons
		644, // chmod 644 (rw-r--r--)
		755, // chmod 755 (rwxr-xr-x)
		777, // chmod 777 (rwxrwxrwx)
		1024, // 1 KiB
		1337, // Leet
		8080, // alt HTTP port
		9001, // It's over 9000!
		31337, // Elite
		69420, // Nice.
		80085, // Calculator classic
		86400, // seconds in a day
		112358, // Fibonacci sequence start
		127001, // localhost (127.0.0.1)
		141421, // √2 (1.41421...)
		161803, // Golden ratio φ (1.61803...)
		173205, // √3 (1.73205...)
		271828, // e (Euler's number)
		314159, // Pi (3.14159...)
		604800, // seconds in a week
		1048576, // 1 MiB in bytes
		16777215, // 24-bit max (0xFFFFFF)
		19700101, // Unix epoch start (YYYYMMDD)
		31536000, // seconds in a non-leap year
		299792458, // Speed of light in m/s
		2147483647, // 32-bit max signed
		2863529450, // 0xABAD1DEA (A bad idea)
		3131813893, // 0xBAADF00D (Bad food)
		3405691582, // 0xCAFEBABE (Cafe babe - Java class file magic)
		3735928559, // 0xDEADBEEF (Dead beef)
		3735929054, // 0xDEADCODE (Dead code)
		4294967295, // 32-bit max unsigned
	];
	return geekyNumbers[seed % geekyNumbers.length].toLocaleString();
}

export default function Footer() {
	return (
		<footer className="text-center py-4 border-t-2 border-accent-pink mt-8 text-sm">
			<div className="my-3 space-y-1">
				<p className="text-accent-lime">【外部リンク】</p>
				<p>
					<a
						href="https://github.com/flathill404"
						target="_blank"
						rel="noopener noreferrer"
					>
						► GitHub
					</a>
					{" | "}
					<a
						href="https://x.com/flathill404"
						target="_blank"
						rel="noopener noreferrer"
					>
						► X (Twitter)
					</a>
				</p>
			</div>

			<p className="text-accent-pink my-2">
				あなたは{" "}
				<span className="text-accent-yellow font-bold" suppressHydrationWarning>
					{getGeekyNumber()}
				</span>{" "}
				人目の訪問者です
			</p>

			<p className="text-gray-400 my-2">Last Update: 2026-02-27</p>

			<p className="text-gray-400">
				&copy; {new Date().getFullYear()} flathill404
			</p>
		</footer>
	);
}
