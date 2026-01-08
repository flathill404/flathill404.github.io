import Image from 'next/image';
import Link from 'next/link';

interface ErrorViewProps {
    imageSrc: string;
    altText: string;
    message?: string;
    title?: string;
}

export default function ErrorView({
    imageSrc,
    altText,
    message,
    title = 'Error',
}: ErrorViewProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
            <div className="w-full max-w-lg mb-8">
                <Image
                    src={imageSrc}
                    alt={altText}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-full"
                    priority
                />
            </div>
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            {message && <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">{message}</p>}

            <Link
                href="/"
                className="px-6 py-3 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity duration-200 font-medium"
            >
                Back to Home
            </Link>
        </div>
    );
}
