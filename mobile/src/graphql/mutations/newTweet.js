import gql from "graphql-tag";
import FEED_CARD_QUERY from '../fragments/feedcard.js'

export default gql`
	mutation createTweet($text: String!) {
		createTweet(text: $text) {
            ...FeedCard
		}
	}
    ${FEED_CARD_QUERY}

`;
