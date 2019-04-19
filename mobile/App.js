import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from "react-redux";
import { store, persistor, client } from "./src/store";
import { PersistGate } from 'redux-persist/integration/react'
import { colors } from './src/utils/constants';
import { ApolloProvider } from 'react-apollo';
import { UIManager } from 'react-native'
import { ThemeProvider } from 'styled-components';
import AppNavigator from './src/navigation.js'

if(UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={colors}>
            <AppNavigator />
          </ThemeProvider>
        </PersistGate>
      </ApolloProvider>
    );
  }
}