import { registerAs } from "@nestjs/config";
// import { PRODUCTION_ENV } from '../constants/extra-values';
// import { REDIS_NETWORK } from '../constants/redis';

export default registerAs("redis", () => ({
	//   host: process.env.NODE_ENV === PRODUCTION_ENV ? REDIS_NETWORK : 'localhost',
	host: "localhost",
	port: parseInt("6379"),
}));
