import mongoose, { Schema } from 'mongoose';

const FavoriteTweetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        index: true
    },
    tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }]
});
export default mongoose.model('FavoriteTweet', FavoriteTweetSchema)