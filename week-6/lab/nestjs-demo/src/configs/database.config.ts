import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "password1",
			database: "my_blog2",
			synchronize: true,
			autoLoadEntities: true,
			logging: true,
		}),
	],
})
export class DatabaseModule {}
