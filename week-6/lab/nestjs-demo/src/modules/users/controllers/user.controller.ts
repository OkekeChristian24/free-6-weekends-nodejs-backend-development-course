import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { createUserDTO } from "../dtos/user.dto";

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() data: createUserDTO) {
		await this.userService.create(data);

		return { ok: true, message: "User created" };
	}

	@Get()
	async getUsers() {
		return this.userService.getUsers();
	}
}
