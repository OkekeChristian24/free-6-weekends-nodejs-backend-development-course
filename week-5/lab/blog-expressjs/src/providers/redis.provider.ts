import Redis from "ioredis";

const EXPIRES = 180;

export class RedisService {
	constructor(private redis: Redis) {}

	async getCachedItem<T>(key: string): Promise<T[] | null> {
		const cached = await this.redis.get(key);
		if (cached) {
			return JSON.parse(cached) as T[];
		}
		return null;
	}

	async setItemCache<T>(
		key: string,
		data: T[],
		expires: number = EXPIRES,
	): Promise<void> {
		await this.redis.set(key, JSON.stringify(data), "EX", expires);
	}

	async invalidateListCache(key: string): Promise<void> {
		const stream = this.redis.scanStream({ match: key });
		const keys: string[] = [];

		for await (const resultKeys of stream) {
			keys.push(...(resultKeys as string[]));
		}
		if (keys.length) {
			await this.redis.del(...keys);
		}
	}
}
