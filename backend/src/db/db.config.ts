import { ConfigService } from "@nestjs/config";

export const getDbConfig = (configService: ConfigService) => {
    const host = configService.get('database.host');
    const db_name = configService.get('database.name');
    const username = configService.get('database.username');
    const password = configService.get('database.password');
    return {
        config: {
            client: 'pg',
            connection: {
                host: host,
                user: username,
                password: password,
                database: db_name,
            },
        }
    }
}
