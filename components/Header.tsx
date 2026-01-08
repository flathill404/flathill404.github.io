import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
                    <Image
                        src="/images/ducks/duck.webp"
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                    flathill404
                </Link>
            </div>
        </header>
    );
}
