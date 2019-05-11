import gql from "graphql-tag";
import FeedCard from '../../components/FeedCard/FeedCard.js'
export default gql`
	query getTweets($offset: Int, $limit: Int) {
		getTweets(offset: $offset, limit: $limit) {
			...FeedCard
		}
	}
	${FeedCard.fragments.tweet}
`;
