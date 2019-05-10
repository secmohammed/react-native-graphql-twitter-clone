import gql from "graphql-tag";

export default gql`
    mutation favoriteTweet($id: ID!) {
        favoriteTweet(_id: $id) {
            isFavorited
            favoriteCount
        }
    }
`;
