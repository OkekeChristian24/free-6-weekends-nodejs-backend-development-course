import { Request, Response, Router } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";

export class AuthController {
	constructor(private authService: AuthService) {}

	async register(req: Request, res: Response) {
		const data = req.body as RegisterDTO;
		const registeredUser = await this.authService.register(data);
		if (!registeredUser) {
			return res.status(409).json({ message: "Email already exist" });
		}
		delete registeredUser?.password;
		return res
			.status(201)
			.json({ data: registeredUser, message: "User registered" });
	}

	async login(req: Request, res: Response) {
		const data = req.body as LoginDTO;
		const result = await this.authService.login(data);
		if (!result) {
			return res.status(410).json({ message: "Invalid email or password" });
		}
		return res.status(200).json({ data: { ...result } });
	}
}
