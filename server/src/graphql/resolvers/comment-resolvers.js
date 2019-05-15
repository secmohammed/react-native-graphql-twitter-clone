import Comment from '../../Models/Comment.js'
import { requireAuth } from '../../services/auth.js'
export default {
    comments: async (_, { tweet }) => {
        const comment = await Comment.findOne({ tweet }).populate('tweet').populate('user').populate('replies.comment');
        return comment;
    },
    updateComment: async(_, { body, tweet, comment, reply }, { user }) => {
        // fetch the comment associated with reply if replyId is provided
        console.log(body, tweet, comment, reply)
    },
    createComment: async (_, { body, tweet }, { user }) => {
        await requireAuth(user)
        let comment = await Comment.findOne({ tweet });
        // comment isn't created yet.
        if (!comment) {
            comment = await Comment.create({
                tweet,
                user: user._id,
                body
            })
            return comment;
        }
        // comment is created, it's a reply.
        comment.replies.push({
            comment: comment._id,
            body,
            tweet,
            user
        })
        await comment.save();
        return comment;
    } 
}