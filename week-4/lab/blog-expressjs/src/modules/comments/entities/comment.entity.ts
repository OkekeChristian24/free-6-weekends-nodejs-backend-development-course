import { RowDataPacket } from "mysql2";
import { CaseCasted } from "../../../common/constants/variables";

export interface CommentEntity extends RowDataPacket {
	id?: number;
	text: string;
	[CaseCasted.postID]: number; // post_id (relation => post(id))
	[CaseCasted.userID]: number; // user_id (relation => user(id))
	[CaseCasted.createdAt]?: Date; // created_at: Date
	[CaseCasted.updatedAt]?: Date; // updated_at: Date
}
