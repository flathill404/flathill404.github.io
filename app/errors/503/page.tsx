import ErrorView from "@/components/ErrorView";

export default function ServiceUnavailablePage() {
	return (
		<ErrorView
			imageSrc="/images/errors/503.webp"
			altText="503 Service Unavailable"
			title="サービス利用不可"
			message="現在サービスをご利用いただけません。しばらくしてから再度お試しください。"
		/>
	);
}
