export default `
  scalar Date
  type Status {
    message: String!
  }
  type Auth {
    token: String!
  }
  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    tweets: [Tweet]!
    createdAt: Date!
    updatedAt: Date!
  }
  type Tweet {
    _id: ID!
    text: String!
    user: User!
    favoriteCount: Int!
    isFavorited: Boolean
    createdAt: Date!
    updatedAt: Date!
  }
  type Query {
    getTweet(_id: ID!): Tweet
    getTweets(offset: Int, limit: Int): [Tweet]
    getUserTweets: [Tweet]
    me: User
  }
  type Mutation {
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status
    favoriteTweet(_id: ID!): Tweet
    signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
    signin(email: String!, password: String!): Auth!
  }
  type Subscription {
    tweetAdded: Tweet!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
