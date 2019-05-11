import gql from 'graphql-tag'
export default gql`
    fragment FeedCard on Tweet {
        text
        _id
        createdAt
        isFavorited
        favoriteCount
        user {
            username
            avatar
            lastName
            firstName
        }
    }
`;
