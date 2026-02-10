"use client";

import { useEffect } from "react";
import ErrorView from "@/components/ErrorView";

export default function ErrorPage({
	error,
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
			title="エラーが発生しました"
			message="ご迷惑をおかけします。しばらくしてから再度お試しください。"
		/>
	);
}
