import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/users/user.module";
import { DatabaseModule } from "./configs/database.config";

@Module({
	imports: [UserModule, DatabaseModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
