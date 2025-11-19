import { body, param } from "express-validator";

export const updateUserValidator = [
	param("id").isInt().withMessage("ID must be an integer"),
	body("name").optional().isString().withMessage("Name must be a string"),
];

export const getUserValidator = [
	param("id").isInt().withMessage("ID must be an integer"),
];
