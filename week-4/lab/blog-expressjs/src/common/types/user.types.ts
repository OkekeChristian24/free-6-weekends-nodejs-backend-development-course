import { User } from "../../modules/users/entities/user.entity";

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

export interface AuthenticatedUser {
	id: number;
	email: string;
}
