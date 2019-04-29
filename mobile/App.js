import React, { Component } from "react";
import { Text, View } from "react-native";
import { client } from "./src/graphql";
import { persistor, store } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { colors } from "./src/utils/constants";
import { ApolloProvider } from "react-apollo";
import { UIManager, AsyncStorage } from "react-native";
import { ThemeProvider } from "styled-components";
import AppNavigator from "./src/navigation.js";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { setContainer } from "./src/services/navigator";
import { Provider } from "react-redux";
import Loading from './src/components/Loading.js'
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <ActionSheetProvider>
            <ThemeProvider theme={colors}>
              <AppNavigator
                ref={navigatorRef => {
                  setContainer(navigatorRef);
                }}
              />
            </ThemeProvider>
          </ActionSheetProvider>
        </PersistGate>
      </ApolloProvider>
      </Provider>
    );
  }
}
