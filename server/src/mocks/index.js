import faker from "faker";

import Tweet from "../Models/Tweet";
import User from "../Models/User.js";

const TWEETS_TOTAL = 3;
const USERS_TOTAL = 3;
export default async () => {
	try {
		await Tweet.deleteMany();
		await User.deleteMany();
		await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
			const user = await User.create({
				username: faker.internet.userName(),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
				password: "secret"
			});
			await Array.from({ length: TWEETS_TOTAL }).forEach(
				async () =>
					await Tweet.create({ text: faker.lorem.sentence(), user: user._id })
			);
		});
	} catch (error) {
		throw error;
	}
};
