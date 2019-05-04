export default `
  scalar Date
  type Status {
    message: String!
  }
  type Auth {
    token: String!
  }
  type Me {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }
  type Tweet {
    _id: ID!
    text: String!
    user: Me!
    favoriteCount: Int!
    createdAt: Date!
    updatedAt: Date!
  }
  type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
    getUserTweets: [Tweet]
    me: Me
  }
  type Mutation {
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status
    signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
    signin(email: String!, password: String!): Auth
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
