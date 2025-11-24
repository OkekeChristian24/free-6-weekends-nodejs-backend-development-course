import { RowDataPacket } from "mysql2";
import { CaseCasted } from "../../../common/constants/variables";

export interface User extends RowDataPacket {
	id?: number;
	name: string;
	email: string;
	password?: string;
	bio?: string;
	[CaseCasted.createdAt]?: Date; // created_at: Date
	[CaseCasted.updatedAt]?: Date; // updated_at: Date
}
