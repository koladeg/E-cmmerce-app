import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';


enableScreens();

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart'
import ShopNavigator from './navigation/ShopNavigator';
import ordersReducer from './store/reducers/orders'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: ordersReducer
});

const store = createStore(rootReducer)

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

const [fontLoaded, setFontLoaded] = useState(false)

if (!fontLoaded) {
  return <AppLoading startAsync={fetchFonts} onFinish={() => {
    setFontLoaded(true);
  }} onError={console.warn} />
}
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

