import gql from 'graphql-tag'
export default gql`
    fragment FeedCard on Tweet {
        text
        _id
        createdAt
        isFavorited
        favoriteCount
        user {
            _id
            username
            avatar
            lastName
            firstName
        }
    }
`;
