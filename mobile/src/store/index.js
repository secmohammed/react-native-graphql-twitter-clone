import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
	key: "root",
	storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};
const middlewares = [thunk];
export const store = createStore(
	persistedReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
