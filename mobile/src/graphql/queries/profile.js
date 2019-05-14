import gql from "graphql-tag";
import FEED_CARD_QUERY from '../fragments/feedcard.js'
import USER_FRAGMENT_QUERY from '../fragments/user.js'

export default gql`
    query getUser($id: ID!) {
        getUser(_id: $id) {
            ...Me
            followersCount
            followingsCount
            tweets {
                ...FeedCard
            }
        }
    }
    ${FEED_CARD_QUERY}
    ${USER_FRAGMENT_QUERY}
`;
