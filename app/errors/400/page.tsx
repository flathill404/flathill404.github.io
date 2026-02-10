import ErrorView from "@/components/ErrorView";

export default function BadRequestPage() {
	return (
		<ErrorView
			imageSrc="/images/errors/400.webp"
			altText="400 Bad Request"
			title="不正なリクエスト"
			message="リクエストを処理できませんでした。"
		/>
	);
}
