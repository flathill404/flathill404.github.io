import ErrorView from "@/components/ErrorView";

export default function ForbiddenPage() {
	return (
		<ErrorView
			imageSrc="/images/errors/403.webp"
			altText="403 Forbidden"
			title="アクセス制限"
			message="このページへのアクセス権限がありません。"
		/>
	);
}
