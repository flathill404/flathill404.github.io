import ErrorView from '@/components/ErrorView';

export default function NotFound() {
    return (
        <ErrorView
            imageSrc="/images/errors/404.webp"
            altText="404 Not Found"
            title="Page Not Found"
            message="The page you are looking for does not exist."
        />
    );
}
