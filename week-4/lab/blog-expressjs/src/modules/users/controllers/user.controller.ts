import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { ExceptionMessages } from "../../../common/messages/exception.message";
import { AuthenticatedUser } from "../../../common/types/user.types";

export class UserController {
	public router = Router();

	constructor(private userService: UserService) {}

	async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userID } = req.params;
			const user = await this.userService.getUserById(Number(userID));
			if (!user) {
				res.status(404).json({ message: ExceptionMessages.USER_NOT_FOUND });
			}
			delete user?.password;
			return res.status(200).json({ data: user });
		} catch (error) {
			next(error);
		}
	}

	async getProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const authUser = req.user as AuthenticatedUser;
			const user = await this.userService.getUserById(Number(authUser.id));
			delete user?.password;
			return res.status(200).json({ data: user });
		} catch (error) {
			next(error);
		}
	}

	async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const authUser = req.user as AuthenticatedUser;
			const data = req.body as UpdateUserDTO;
			const updatedUser = await this.userService.updateUser(
				Number(authUser.id),
				data,
			);

			delete updatedUser.password;

			return res.status(200).json({ data: updatedUser });
		} catch (error) {
			next(error);
		}
	}
}
