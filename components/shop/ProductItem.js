import React from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Card from '../UI/Card';


const ProductItem = ({image, title, price, onSelect, children}) => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <Card style={styles.product}>
            <TouchableCmp  onPress={onSelect} useForeground>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: image}} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    {children}
                </View>
         </TouchableCmp>
        </Card>
        
    )
}

export default ProductItem

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height:'60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height:'100%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10      
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },
})
