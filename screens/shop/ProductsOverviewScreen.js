import React, { useEffect, useState, useCallback } from 'react'
import { Button, FlatList, ActivityIndicator, View, StyleSheet, Text} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Platform } from 'react-native';

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'


const ProductsOverviewScreen = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback (async () => {
        console.log('LOAD PRODUCTS');
        setError(null)
        setIsRefreshing(true)
        try {
            await dispatch(productActions.fetchProducts())
        } catch (err) {
            setError(err.message);
        }
        
        setIsRefreshing(false);
    }, [dispatch, setError, setIsLoading])

    useEffect(() => {
        const willFocusSub = navigation.addListener('focus',() => {
            loadProducts()
          }) 
        return () => {
            willFocusSub
        };

    }, [loadProducts])

    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadProducts])

    const selectItemHandler = (id, title) => {
        navigation.navigate('ProductDetail', {
            productId: id, 
            productTitle: title
        })
    }

    if(error) {
        return (
            <View style={styles.centered}>
                <Text>An error ocurred!</Text>
                <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
            </View>
            )
    }

    if(isLoading){
        return (
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
        )
    }

    if (!isLoading && products.length === 0){
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start by adding some!</Text>
            </View>
            )
    }

    return (
            <FlatList onRefresh={loadProducts} refreshing={isRefreshing} data={products} keyExtractor={item => item.id} 
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

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center'}
})

export default ProductsOverviewScreen

export const productScreenOptions = ({ navigation }) => {
    return { 
        title: 'All Products',
        headerLeft: () => (<HeaderButton title= 'menu' name={Platform === 'android' ? "md-menu" : "ios-menu"} onPress={ () => { navigation.toggleDrawer()}}/>),
        headerRight: () => (<HeaderButton title= 'cart' name={Platform === 'android' ? "md-cart" : "ios-cart"} onPress={ () => { navigation.navigate('Cart')}}/>),
    }
}


