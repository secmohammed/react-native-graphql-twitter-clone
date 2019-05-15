import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    },
    replies: {
        type: [ new Schema({
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            comment: {
                type: Schema.Types.ObjectId,
                ref: "Comment",
                required: true
            },
            tweet: {
                type: Schema.Types.ObjectId,
                ref: "Tweet",
                required: true
            },

            body: {
                type: String,
                required: true
            }
        }) ],
        default: []
    }
});
export default mongoose.model("Comment", CommentSchema);
