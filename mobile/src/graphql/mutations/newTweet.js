import gql from "graphql-tag";
import FeedCard from '../../components/FeedCard/FeedCard.js'

export default gql`
	mutation createTweet($text: String!) {
		createTweet(text: $text) {
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
	}
`;
