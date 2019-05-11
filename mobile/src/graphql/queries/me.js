import gql from "graphql-tag";
import USER_FRAGMENT_QUERY from '../fragments/user.js'
export default gql`
	{
		me {
			...Me
		}
	}
	${USER_FRAGMENT_QUERY}
`;
