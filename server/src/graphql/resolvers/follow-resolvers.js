import Tweet from "../../Models/Tweet";
import User from "../../Models/User";
import FollowingUser from "../../Models/FollowingUser";
import { requireAuth } from "../../services/auth";

export default {
    follow: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            await FollowingUser.findOneOrCreate({ user }, async (err, follow) => {
                if (!follow.followings.some(f => f.equals(_id))) {
                    follow.followings.push(_id)
                    await follow.save()
                }
            })
            return User.findById(user);      
        } catch (error) {
            throw error;
        }
    },
    unfollow: async(_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            await FollowingUser.findOne({ user, followings: { _id } }, async (err, follow) => {
                if (err) {
                    throw err;
                }
                follow.followings.pull(_id);
                await follow.save();

            })
            return User.findById(user);      

        } catch(e) {
            // statements
            console.log(e);
        }
    }
};