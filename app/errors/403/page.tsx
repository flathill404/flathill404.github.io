import ErrorView from '@/components/ErrorView';

export default function ForbiddenPage() {
    return (
        <ErrorView
            imageSrc="/images/errors/403.webp"
            altText="403 Forbidden"
            title="Access Restricted"
            message="You do not have permission to access this resource."
        />
    );
}
