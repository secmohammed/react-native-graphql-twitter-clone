import gql from "graphql-tag";

export default gql`
	{
		me {
			_id
			username
			email
			firstName
			lastName
			avatar
			createdAt
			updatedAt
		}
	}
`;
