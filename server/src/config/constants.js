import os from 'os'
const networkInterfaces = os.networkInterfaces();
const IP_ADDRESS = networkInterfaces.en0[1].address

export default {
	PORT: process.env.PORT || 3000,
	DB_URL: "mongodb://localhost/tweet-development",
	GRAPHQL_PATH: "/graphiql",
	JWT_SECRET: "secret123",
    IP_ADDRESS
};
