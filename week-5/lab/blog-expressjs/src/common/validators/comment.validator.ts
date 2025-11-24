import { body, param } from "express-validator";

export const createCommentValidator = [
	body("text").trim().isString().withMessage("Title must be a string"),
	param("postID").isInt().withMessage("Post ID must be a number"),
];

export const updateCommentValidator = [
	body("text").trim().isString().withMessage("Title must be a string"),
	param("postID").isInt().withMessage("Post ID must be a number"),
	param("commentID").isInt().withMessage("Comment ID must be a number"),
];
