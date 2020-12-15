import React from 'react'
import { Platform } from 'react-native';
import { createNativeStackNavigator} from "react-native-screens/native-stack";
import Colors from '../constants/Colors';
import ProductDetailScreen, { detailScreenOptions } from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen, { productScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';


const ProductNavigator = createNativeStackNavigator()


const ShopNavigator = ({ navigation }) => {
    return (
            <ProductNavigator.Navigator>
                <ProductNavigator.Screen name="ProductsOverview" 
                    component={ProductsOverviewScreen} 
                    options={productScreenOptions}/>
                <ProductNavigator.Screen name="ProductDetail" component={ProductDetailScreen} options={detailScreenOptions}/>
                <ProductNavigator.Screen name="Cart" component={CartScreen} />
            </ProductNavigator.Navigator>
    )
}

const shopDrawerNavigator = createNative

export default ShopNavigator
