import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginResponse } from "../../../common/types/user.types";
import { User } from "../../users/entities/user.entity";
import { UserService } from "../../users/services/user.service";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";

export class AuthService {
	constructor(private userService: UserService) {}

	async register(data: RegisterDTO): Promise<User | undefined> {
		const { name, email, password } = data;
		const registeredUser = await this.userService.createUser({
			name,
			email,
			password,
		});

		return registeredUser;
	}

	async login(data: LoginDTO): Promise<LoginResponse | undefined> {
		const { email, password } = data;

		const vallidUser = await this.validateCredentials(email, password);
		if (!vallidUser) {
			return undefined;
		}

		const accessToken = await this.createAccessToken(vallidUser);
		const refreshToken = await this.createRefreshToken(vallidUser);

		return { accessToken, refreshToken };
	}

	private async validateCredentials(email: string, password: string) {
		const user = await this.userService.getUserByEmail(email);
		if (!user) {
			return null;
		}
		const match = bcrypt.compare(password, user.password!);
		if (!match) {
			return null;
		}
		return user;
	}

	private async createAccessToken(user: User) {
		const accessToken = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.ACCESS_SECRET as string,
			{
				expiresIn: "1d",
			},
		);
		return accessToken;
	}

	private async createRefreshToken(user: User) {
		const refreshToken = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.REFRESH_SECRET as string,
			{
				expiresIn: "30d",
			},
		);
		return refreshToken;
	}
}
