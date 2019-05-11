import gql from 'graphql-tag'
export default gql`
    fragment Me on User {
        _id
        username
        email
        firstName
        lastName
        avatar
        createdAt
        updatedAt
    }
`;
