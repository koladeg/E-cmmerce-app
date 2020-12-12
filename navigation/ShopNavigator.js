import React from 'react'
import { Platform } from 'react-native';
import { createNativeStackNavigator} from "react-native-screens/native-stack";
import Colors from '../constants/Colors';
import ProductDetailScreen, { detailScreenOptions } from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ProductNavigator = createNativeStackNavigator()


const ShopNavigator = () => {
    return (
            <ProductNavigator.Navigator>
                <ProductNavigator.Screen name="ProductsOverview" 
                    component={ProductsOverviewScreen} 
                    options={{ 
                        headerStyle: {backgroundColor: Platform.OS === 'android' ? Colors.primary: '' }, 
                        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
                        headerTitleStyle: {
                            fontFamily: 'open-sans-bold'
                        },
                        headerBackTitleStyle: {
                            fontFamily: 'open-sans'
                        }
                    }}/>
                <ProductNavigator.Screen name="ProductDetail" component={ProductDetailScreen} options={detailScreenOptions}/>
            </ProductNavigator.Navigator>
    )
}

export default ShopNavigator
