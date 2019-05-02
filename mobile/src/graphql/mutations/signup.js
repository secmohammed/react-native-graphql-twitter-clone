import gql from "graphql-tag";

export default gql`
	mutation signup(
		$email: String!
		$fullName: String!
		$username: String!
		$avatar: String
		$password: String!
	) {
		signup(
			email: $email
			fullName: $fullName
			password: $password
			avatar: $avatar
			username: $username
		) {
			token
		}
	}
`;
