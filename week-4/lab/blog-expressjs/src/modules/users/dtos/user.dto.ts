export class CreateUserDTO {
	name!: string;
	email!: string;
	password!: string;
}

export class UpdateUserDTO {
	name?: string;
	bio?: string;
}
