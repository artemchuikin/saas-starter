export default () => ({
    apiUrl: process.env.API_URL,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3002',
    domain: process.env.DOMAIN,
    port: process.env.PORT,
    database: {
        host: process.env.DATABASE_HOST,
        name: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    },
    redis: {
        host: process.env.REDIS_HOST
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        resetTokenTtl: parseInt(process.env.JWT_RESET_TOKEN_TTL ?? '1800', 10),
        accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
        refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '2592000', 10)
    },
    email: {
        host: process.env.EMAIL_HOST,
        username: process.env.EMAIL_NAME,
        password: process.env.EMAIL_PASSWORD
    },
    telegram: {
        chatId: process.env.CHAT_ID,
        token: process.env.BOT_TOKEN
    },
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        serviceId: process.env.TWILIO_SERVICE_ID
    },
    googleAuth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
});
