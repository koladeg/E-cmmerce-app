import React from 'react'
import { Button, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Platform } from 'react-native';

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

const ProductsOverviewScreen = ({ navigation }) => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail', {
            productId: id, 
            productTitle: title
        })
    }

    return (
            <FlatList  data={products} keyExtractor={item => item.id} 
                renderItem={
                    itemData => <ProductItem 
                        image={itemData.item.imageUrl} 
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <Button 
                            color={Colors.primary} 
                            title="View Details" 
                            onPress={() => {
                                selectItemHandler(itemData.item.id, itemData.item.title)
                        }   } />
                        <Button 
                            color={Colors.primary} 
                            title="To Cart" 
                            onPress={() => {dispatch(cartActions.addToCart(itemData.item))}} 
                        />
                    </ProductItem>
                    } />
    )
}

export default ProductsOverviewScreen

export const productScreenOptions = ({ navigation }) => {
    return { 
        title: 'All Products',
        headerLeft: () => (<HeaderButton title= 'menu' name={Platform === 'android' ? "md-menu" : "ios-menu"} onPress={ () => { navigation.toggleDrawer()}}/>),
        headerRight: () => (<HeaderButton title= 'cart' name={Platform === 'android' ? "md-cart" : "ios-cart"} onPress={ () => { navigation.navigate('Cart')}}/>),
    }
}


