import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <View>
        Open up App.js to start working on your app!
      </View>
      <StatusBar style="auto" />
    </Provider>
  );
}

