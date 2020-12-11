import React from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const ProductDetailScreen = ({ navigation, route }) => {
    const { productId } = route.params;

    const selectedProduct = useSelector(
        state => state.products.availableProducts.find( prod => prod.id === productId)
        )


    return (
        <View>
            <ScrollView>
                <Image style={styles.Image} source= {{ uri: selectedProduct.imageUrl}}/> 
                <View style={styles.actions}>
                    <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
                </View>  
                <Text style={styles.price}>${selectedProduct.price}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </ScrollView>
        </View>
    )
}

export default ProductDetailScreen

export const detailScreenOptions = ({ route }) => {
    return {
        headerTitle: route.params.productTitle
    }
}

const styles = StyleSheet.create({
    Image: {
        width: '100%',
        height: 300,
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',

    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
})
