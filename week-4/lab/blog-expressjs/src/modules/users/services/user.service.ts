import { Pool } from "mysql2/promise";
import bcrypt from "bcrypt";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { User } from "../entities/user.entity";
// import pool from "../../../configs/database.config";
import { ResultSetHeader } from "mysql2";
import {
	ConflictException,
	NotFoundException,
} from "../../../common/exceptions";
import { ExceptionMessages } from "../../../common/messages/exception.message";

export class UserService {
	constructor(private pool: Pool) {}

	async createUser(data: CreateUserDTO): Promise<User> {
		const { name, email, password } = data;
		const isUsed = await this.isEmailAlreadyUsed(email);
		if (isUsed) {
			throw new ConflictException(ExceptionMessages.EMAIL_ALREADY_EXIST(email));
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const [result] = await this.pool.execute(
			"INSERT INTO `user`(`email`, `name`, `password`) VALUES (?, ?, ?)",
			[email, name, hashedPassword],
		);
		const insertResult = result as ResultSetHeader;

		const userID = insertResult.insertId;

		const [rows] = await this.pool.query<User[]>(
			"SELECT * FROM `user` WHERE `id` = ?",
			[userID],
		);

		const createdUser = rows[0];
		return createdUser;
	}

	async isEmailAlreadyUsed(email: string) {
		try {
			const user = await this.getUserByEmail(email);
			return true;
		} catch (error) {
			return false;
		}
	}

	async getUserById(id: number): Promise<User> {
		const [users] = await this.pool.query<User[]>(
			"SELECT * FROM `user` WHERE `id` = ?",
			[id],
		);
		const user = users[0];
		if (!user) {
			throw new NotFoundException(ExceptionMessages.USER_NOT_FOUND);
		}
		return user;
	}

	async getUserByEmail(email: string): Promise<User> {
		const [users] = await this.pool.query<User[]>(
			"SELECT * FROM `user` WHERE `email` = ?",
			[email],
		);
		const user = users[0];
		if (!user) {
			throw new NotFoundException(ExceptionMessages.USER_NOT_FOUND);
		}
		return user;
	}

	async updateUser(id: number, data: UpdateUserDTO): Promise<User> {
		const user = await this.getUserById(id);

		const updates = [];
		const params = [];

		const { name, bio } = data;
		if (name) {
			updates.push("`name` = ?");
			params.push(name);
		}
		if (bio) {
			updates.push("`bio` = ?");
			params.push(bio);
		}

		params.push(user.id);
		// const sql = `UPDATE user SET ${updates.join(', ')} WHERE id = ? LIMIT 1`;
		const sql =
			"UPDATE `user` SET " + updates.join(", ") + " WHERE `id` = ? LIMIT 1";
		await this.pool.execute(sql, params);

		const updatedUser = await this.getUserById(user.id!);
		return updatedUser;
	}
}
