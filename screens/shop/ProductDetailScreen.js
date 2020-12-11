import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';

const ProductDetailScreen = ({ navigation, route }) => {
    const { productId } = route.params;

    const selectedProduct = useSelector(
        state => state.products.availableProducts.find( prod => prod.id === productId)
        )


    return (
        <View>
            <Text>{selectedProduct.title}</Text>
        </View>
    )
}

export default ProductDetailScreen

export const detailScreenOptions = ({ route }) => {
    return {
        headerTitle: route.params.productTitle
    }
}

const styles = StyleSheet.create({})
