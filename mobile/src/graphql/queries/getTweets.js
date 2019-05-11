import gql from "graphql-tag";
import FEED_CARD_QUERY from '../fragments/feedcard.js'
export default gql`
	query getTweets($offset: Int, $limit: Int) {
		getTweets(offset: $offset, limit: $limit) {
			...FeedCard
		}
	}
	${FEED_CARD_QUERY}
`;
