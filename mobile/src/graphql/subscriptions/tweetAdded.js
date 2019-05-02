import gql from "graphql-tag";
export default gql`
	subscription {
		tweetAdded {
			text
			_id
			createdAt
			favoriteCount
			user {
				username
				avatar
				firstName
				lastName
			}
		}
	}
`;
