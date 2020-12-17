import React, { useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'

const EditProductScreen = ({ route }) => {

    const prodId = route.params.productId

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

    return (
        <ScrollView style={styles.form}>
            <View style={styles.formControl}>
                 <Text style={styles.label}>Title</Text>
                 <TextInput style={styles.input} value={title} onChange={text => setTitle(text)}/>
             </View>
             <View style={styles.formControl}>
                 <Text style={styles.label}>Image URL</Text>
                 <TextInput style={styles.input} value={imageUrl} onChange={text => setImageUrl(text)}/>
             </View>
             { editedProduct ? null : ( 
                 <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChange={text => setPrice(text)}/>
                </View>
             )}
             <View style={styles.formControl}>
                 <Text style={styles.label}>Description</Text>
                 <TextInput style={styles.input} value={description} onChange={text => setDescription(text)}/>
             </View>
        </ScrollView>
    )
}

export const editProductScreenOptions = ({ route }) => {
    const { productId } = route.params;
    return { 
        title: productId ? 'Edit Product' : 'Add Product',
        // headerLeft: () => (
        // <HeaderButton 
        //     title= 'cart' 
        //     name={Platform === 'android' ? "md-menu" : "ios-menu"} 
        //     onPress={ () => { navigation.toggleDrawer()}}
        // />),
        headerRight: () => (
            <HeaderButton 
                title= 'Save' 
                name={Platform === 'android' ? "md-checkmark" : "ios-checkmark"} 
                onPress={ () => { }}
            />),
    }
}

export default EditProductScreen

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
})
