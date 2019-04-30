import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AsyncStorage } from "react-native";
import { setContext } from "apollo-link-context";
import config from 'react-global-configuration';

require('../config');

const customFetch = (uri, options) => {
  return fetch(uri, options)
    .then(response => {
      if (response.status >= 400) {
        // or handle 400 errors
        return Promise.reject(response.status);
      }
      return response;
    })
    .catch(err => console.log(err));
};

const httpLink = createHttpLink({
  uri: config.get('graphql.uri'),
  fetch: customFetch
});
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    };
  }
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
