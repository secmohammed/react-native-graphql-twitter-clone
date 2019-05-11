import gql from "graphql-tag";
import FeedCard from '../../components/FeedCard/FeedCard.js'

export default gql`
	subscription {
		tweetAdded {
			...FeedCard
		}
	}
	${FeedCard.fragments.tweet}

`;
