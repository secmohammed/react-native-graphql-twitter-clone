import gql from "graphql-tag";
import FEED_CARD_QUERY from '../fragments/feedcard.js'

export default gql`
	subscription {
		tweetAdded {
			...FeedCard
		}
	}
    ${FEED_CARD_QUERY}

`;
