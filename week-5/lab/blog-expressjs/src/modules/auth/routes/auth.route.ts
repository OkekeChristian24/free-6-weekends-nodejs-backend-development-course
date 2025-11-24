import { Router } from "express";
import { UserService } from "../../users/services/user.service";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import {
	loginValidator,
	registerValidator,
} from "../../../common/validators/auth.validator";
import pool from "../../../configs/database.config";

const router = Router();

const userService = new UserService(pool);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router.post(
	"/register",
	registerValidator,
	validate,
	authController.register.bind(authController),
);
router.post(
	"/login",
	loginValidator,
	validate,
	authController.login.bind(authController),
);

export default router;
