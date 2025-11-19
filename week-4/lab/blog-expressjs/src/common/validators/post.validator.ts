import { body } from "express-validator";

export const createPostValidator = [
	body("title")
		.trim()
		.notEmpty()
		.isString()
		.withMessage("Title must be a string"),
	body("content")
		.trim()
		.notEmpty()
		.isString()
		.withMessage("Content must be a string"),
];

export const updatePostValidator = [
	body("title")
		.trim()
		.optional()
		.isString()
		.withMessage("Title must be a string"),
	body("content")
		.trim()
		.optional()
		.isString()
		.withMessage("Content must be a string"),
];
