import ErrorView from "@/components/ErrorView";

export default function ServiceUnavailablePage() {
  return (
    <ErrorView
      imageSrc="/images/errors/503.webp"
      altText="503 Service Unavailable"
      title="Service Unavailable"
      message="The server is currently unavailable. Please try again later."
    />
  );
}
