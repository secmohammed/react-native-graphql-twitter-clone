import gql from "graphql-tag";
import FEED_CARD_QUERY from '../fragments/feedcard.js'
import USER_FRAGMENT_QUERY from '../fragments/user.js'

export default gql`
    {
        me {
            ...Me
            tweets {
                ...FeedCard
            }
        }
    }
    ${FEED_CARD_QUERY}
    ${USER_FRAGMENT_QUERY}
`;
