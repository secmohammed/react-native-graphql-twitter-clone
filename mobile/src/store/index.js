import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const persistConfig = {
  key: 'root',
  storage,
}

export const client = new ApolloClient({
  link: createHttpLink({  uri: 'https://c11a5a74.ngrok.io/graphql' }),
  cache: new InMemoryCache(),
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const initialState = {};
const middlewares = [ thunk];
export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

export const  persistor = persistStore(store);