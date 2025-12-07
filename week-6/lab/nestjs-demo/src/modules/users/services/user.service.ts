import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { createUserDTO } from "../dtos/user.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userResponsitory: Repository<UserEntity>,
	) {}

	async create(user: createUserDTO) {
		const newUser: UserEntity = {
			email: user.email,
			name: user.name,
		};

		const createdUser = this.userResponsitory.create(newUser);
		await this.userResponsitory.save(createdUser);

		return true;
	}

	async getUsers() {
		const users = await this.userResponsitory.find();

		return users;
	}
}
