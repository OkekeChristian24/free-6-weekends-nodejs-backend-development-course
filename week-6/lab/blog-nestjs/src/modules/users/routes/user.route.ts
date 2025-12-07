import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import pool from "../../../configs/database.config";

const router = Router();

const userService = new UserService(pool);
const userController = new UserController(userService);

router.get(
	"/me",
	authMiddleware,
	userController.getProfile.bind(userController),
);
router.get(
	"/:userID",
	authMiddleware,
	userController.getUser.bind(userController),
);
router.put(
	"/me",
	authMiddleware,
	userController.updateProfile.bind(userController),
);

export default router;
