import { body, param } from "express-validator";

export const registerValidator = [
	body("name").isString().withMessage("Name must be a string"),
	body("email").isEmail().withMessage("Must be a valid email"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

export const loginValidator = [
	body("email").isEmail().withMessage("Must be a valid email"),
	body("password")
		.trim()
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
