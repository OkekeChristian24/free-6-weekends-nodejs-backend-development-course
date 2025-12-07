import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ type: "varchar", unique: true, length: 100 })
	email: string;

	@Column({ type: "varchar", length: 255 })
	name: string;
}
