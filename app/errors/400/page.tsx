import ErrorView from "@/components/ErrorView";

export default function BadRequestPage() {
	return (
		<ErrorView
			imageSrc="/images/errors/400.webp"
			altText="400 Bad Request"
			title="Bad Request"
			message="The server cannot process your request due to a client error."
		/>
	);
}
