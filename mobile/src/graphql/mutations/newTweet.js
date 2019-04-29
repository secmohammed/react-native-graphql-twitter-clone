import gql from "graphql-tag";

export default gql`
    mutation createTweet(
            $text: String!
        ) {
        createTweet(
            text: $text,
        ) {
            _id
        }
    }
`;
