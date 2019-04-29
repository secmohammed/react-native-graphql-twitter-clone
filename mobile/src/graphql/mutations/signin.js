import gql from "graphql-tag";

export default gql`
    mutation signin(
            $email: String!
            $password: String!
        ) {
        signin(
            email: $email,
            password: $password
        ) {
            token
        }
    }
`;
