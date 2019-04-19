import gql from "graphql-tag";

export default gql`
{
    getTweets {
        text
        _id
        createdAt
        favoriteCount
        user {
            username
            avatar
            lastName
            firstName
        }
    }
}
`
