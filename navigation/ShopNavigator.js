import React from 'react'
import { Platform } from 'react-native';
import { createNativeStackNavigator} from "react-native-screens/native-stack";
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ProductNavigator = createNativeStackNavigator()


const ShopNavigator = () => {
    return (
            <ProductNavigator.Navigator>
                <ProductNavigator.Screen name="ProductsOverview" 
                    component={ProductsOverviewScreen} 
                    options={{ 
                        headerStyle: {backgroundColor: Platform.OS === 'android' ? Colors.primary: '' }, 
                        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
                    }}/>
            </ProductNavigator.Navigator>
    )
}

export default ShopNavigator
