import "dotenv/config";
import app from "./app";
import appConfig from "./configs/app.config";
import { SuccessMessages } from "./common/messages/success.message";

app.listen(appConfig.port, () => {
	console.log(SuccessMessages.APP_RUNNING(appConfig.port));
});
