import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'

const ProductsOverviewScreen = ({ navigation }) => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    return (
            <FlatList  data={products} keyExtractor={item => item.id} 
                renderItem={
                    itemData => <ProductItem 
                        image={itemData.item.imageUrl} 
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onViewDetail={() => {
                            navigation.navigate('ProductDetail', {
                                productId: itemData.item.id, 
                                productTitle: itemData.item.title
                            })
                        }}
                        onAddToCart={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
                    />
                    } />
    )
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})
