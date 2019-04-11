import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <Text>Open up App.js to start working on my app!</Text>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
