import gql from "graphql-tag";

export default gql`
	query getTweets($offset: Int, $limit: Int) {
		getTweets(offset: $offset, limit: $limit) {
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
