'use client';

import ErrorView from '@/components/ErrorView';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <ErrorView
            imageSrc="/images/errors/500.webp"
            altText="500 Internal Server Error"
            title="Something went wrong"
            message="We apologize for the inconvenience. Please try again later."
        />
    );
}
