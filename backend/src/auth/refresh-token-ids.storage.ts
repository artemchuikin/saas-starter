import Redis from 'ioredis';
import {Injectable, OnApplicationBootstrap, OnApplicationShutdown} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

export class InvalidatedTokenError extends Error {
}

@Injectable()
export class RefreshTokenIdsStorage implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        private readonly configService: ConfigService
    ) {
    }

    private redisClient: Redis;

    onApplicationBootstrap() {
        this.redisClient = new Redis({
            host: this.configService.get('redis.host'),
            port: 6379
        });
    }

    onApplicationShutdown(signal?: string) {
        return this.redisClient.quit();
    }

    async insert(userId: string, tokenId: string): Promise<void> {
        await this.redisClient.set(this.getKey(userId), tokenId);
    }

    async validate(userId: string, tokenId: string): Promise<boolean> {
        const storedId = await this.redisClient.get(this.getKey(userId));
        if (storedId !== tokenId) {
            throw new InvalidatedTokenError();
        }

        return storedId === tokenId;
    }

    async invalidate(userId: string): Promise<void> {
        await this.redisClient.del(this.getKey(userId));
    }

    private getKey(userId: string): string {
        return `rt-user-${userId}`;
    }
}
