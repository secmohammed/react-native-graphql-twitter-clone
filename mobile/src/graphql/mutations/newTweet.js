import gql from "graphql-tag";

export default gql`
    mutation createTweet(
            $text: String!
        ) {
        createTweet(
            text: $text,
        ) {
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
`;
