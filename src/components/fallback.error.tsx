/* eslint-disable @typescript-eslint/no-explicit-any */
function FallbackError({ error }: { error: any }) {
	return <>{error.message}</>;
}

export default FallbackError;
