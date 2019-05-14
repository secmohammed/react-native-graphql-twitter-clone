import mongoose, { Schema } from "mongoose";

const FollowingUserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    index: true
  },
  followings: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true
    }
  ]
});
FollowingUserSchema.statics.findOneOrCreate = function findOneOrCreate(
  condition,
  callback
) {
  const self = this;
  return self.findOne(condition, (err, result) => {
    return result
      ? callback(err, result)
      : self.create(condition, (err, result) => {
          return callback(err, result);
        });
  });
};
export default mongoose.model("FollowingUser", FollowingUserSchema);
