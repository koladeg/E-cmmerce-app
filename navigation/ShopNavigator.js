import React from 'react'
import { Button, Platform, SafeAreaView, View } from 'react-native';
import { createNativeStackNavigator} from "react-native-screens/native-stack";
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import ProductDetailScreen, { detailScreenOptions } from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen, { productScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import CartScreen, { cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { ordersScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductScreen, { userProductScreenOptions } from '../screens/user/UserProductScreen';
import EditProductScreen, { editProductScreenOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen';
import * as authActions from '../store//actions/auth';

const defaultNavOptions = {
    headerStyle: {backgroundColor: Platform.OS === 'android' ? Colors.primary: '' }, 
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitleStyle: { fontFamily: 'open-sans-bold' },
    headerBackTitleStyle: { fontFamily: 'open-sans'},
}

const ProductStackNavigator = createNativeStackNavigator()

export const ProductsNavigator = () => {
    return (
            <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
                <ProductStackNavigator.Screen name="ProductsOverview" 
                    component={ProductsOverviewScreen} 
                    options={productScreenOptions}/>
                <ProductStackNavigator.Screen name="ProductDetail" component={ProductDetailScreen} options={detailScreenOptions}/>
                <ProductStackNavigator.Screen name="Cart" component={CartScreen} options={cartScreenOptions} />
            </ProductStackNavigator.Navigator>
    )
}

const OrdersStackNavigator = createNativeStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions} >
          <OrdersStackNavigator.Screen name="Orders" component={OrdersScreen} options={ordersScreenOptions} />
        </OrdersStackNavigator.Navigator>
      );
}

const AdminStackNavigator = createNativeStackNavigator();

export const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions} >
          <AdminStackNavigator.Screen name="UserProduct" component={UserProductScreen} options={userProductScreenOptions} />
          <AdminStackNavigator.Screen name="EditProduct" component={EditProductScreen} options={editProductScreenOptions}/>
        </AdminStackNavigator.Navigator>
      );
}



const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();

    return (
      <ShopDrawerNavigator.Navigator 
        drawerContent={ props => {
            return (
                <View style={{flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItemList {...props} />
                        <Button 
                            title= "Logout"
                            color={Colors.primary}
                            onPress={() => {
                                dispatch(authActions.logout())
                            }}
                        />
                    </SafeAreaView>
                </View>
            )}
        } 
        drawerContentOptions={{
            activeTintColor: Colors.primary
        }}
      >
      
        <ShopDrawerNavigator.Screen 
            name="Products" 
            component={ProductsNavigator}
            options={{
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        size={23}
                        color={props.color}
                    />
                )
            }}
        />
        <ShopDrawerNavigator.Screen 
            name="Orders" 
            component={OrdersNavigator} 
            options={{
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                        size={23}
                        color={props.color}
                    />
                )
            }}
        />
        <ShopDrawerNavigator.Screen 
            name="Admin" 
            component={AdminNavigator} 
            options={{
                drawerIcon: props => (
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        size={23}
                        color={props.color}
                    />
                )
            }}
        />
      </ShopDrawerNavigator.Navigator>
    );
  }

const AuthStackNavigator = createNativeStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions} >
          <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions} />
        </AuthStackNavigator.Navigator>
      );
}

  

// export default ShopNavigator;