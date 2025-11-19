import { RowDataPacket } from "mysql2";
import { CaseCasted } from "../../../common/constants/variables";

export interface Post extends RowDataPacket {
	id?: number;
	title: string;
	content: string;
	[CaseCasted.userID]: number; // user_id (relation => user(id))
	[CaseCasted.createdAt]?: Date; // created_at: Date
	[CaseCasted.updatedAt]?: Date; // updated_at: Date
}
