import Tweet from "../../Models/Tweet.js";
import User from "../../Models/User.js";
export default {
    search: async (_, { text }) => {
        // search for users/tweets containing query.
        // return users/tweets
        const regex = { $regex: ".*" + text + ".*", $options: "i" }
        const users = await User.find({
            $or: [{ username: regex }, { firstName: regex }, { lastName: regex},{ email: regex }]
        });
        console.log(users)
        const tweets = await Tweet.find({
            text: regex
        }).limit(5);
        console.log(tweets);
        return {
            tweets,
            users
        };
    }
};
