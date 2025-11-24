export const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) {
		return error.message;
	}

	if (error && typeof error === "object" && "message" in error) {
		return String(error.message);
	}

	if (typeof error === "string") {
		return error;
	}

	return "Sorry, something went wrong";
};

export const slowFib = (n: number): number => {
	if (n <= 1) return n;
	return slowFib(n - 1) + slowFib(n - 2);
};
