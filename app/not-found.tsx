import ErrorView from "@/components/ErrorView";

export default function NotFound() {
	return (
		<ErrorView
			imageSrc="/images/errors/404.webp"
			altText="404 Not Found"
			title="ページが見つかりません"
			message="お探しのページは存在しません。"
		/>
	);
}
