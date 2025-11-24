export const ExceptionMessages = {
	// User, Auth
	INVALID_CREDENTIALS: "Invalid credentials",
	EMAIL_ALREADY_EXIST: (email: string) => `Email ${email} already used`,
	USER_NOT_FOUND: "User not found",

	// Post, Comment
	POST_NOT_FOUND: "Post not found",
	COMMENT_NOT_FOUND: "Comment not found",
};
