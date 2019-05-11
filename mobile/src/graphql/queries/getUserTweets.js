import gql from "graphql-tag";
import FeedCard from '../../components/FeedCard/FeedCard.js'

export default gql`
    {
        me {
            _id
            username
            email
            firstName
            lastName
            avatar
            createdAt
            updatedAt
            tweets {
                ...FeedCard
            }
        }
    }
    ${FeedCard.fragments.tweet}
`;
