import gql from "graphql-tag";

export default gql`
	{
		getTweets {
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
