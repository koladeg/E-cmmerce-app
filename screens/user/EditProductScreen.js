import React, { useCallback, useEffect, useState  } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TextInput, View, Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'

const EditProductScreen = ({ route, navigation }) => {

    const prodId = route.params ? route.params.productId: null;

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch()

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [titleIsValid, setTitleIsValid] = useState(false)
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')


    const submitHandler =  useCallback(
        () => {
            if(!titleIsValid){
                Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                    { text: 'Okay'}
            ])
                return;
            }
            if(editedProduct) {
                dispatch(
                    productsActions.updateProduct(prodId, title, description, imageUrl))
            } else {
                dispatch(
                    productsActions.createProduct(title, description, imageUrl, +price)
                )
            }
            navigation.goBack()
        },
        [dispatch, prodId, title, description, imageUrl, price],
    )

    useEffect(() => {
        navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const titleChangeHandler = text => {
        if(text.trim().length > 0) {
            setTitleIsValid(false) 
        } else {
            setTitleIsValid(true)
        }
       setTitle(text)
    }

    return (
        <ScrollView style={styles.form}>
            <View style={styles.formControl}>
                 <Text style={styles.label}>Title</Text>
                 <TextInput 
                    style={styles.input} 
                    value={title} 
                    onChangeText={titleChangeHandler} 
                    autoCapitalize='sentences'
                    autoCorrect
                 />
                 {!titleIsValid && <Text>Please enter a valid title!</Text>}
             </View>
             <View style={styles.formControl}>
                 <Text style={styles.label}>Image URL</Text>
                 <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)}/>
             </View>
             { editedProduct ? null : ( 
                 <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} keyboardType='decimal-pad'/>
                </View>
             )}
             <View style={styles.formControl}>
                 <Text style={styles.label}>Description</Text>
                 <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}/>
             </View>
        </ScrollView>
    )
}

export const editProductScreenOptions = ({ route }) => {
    const submitFn = route.params ? route.params.submit : null;
    const routeParams = route.params ? route.params : {};
    return { 
        title: routeParams.productId ? 'Edit Product' : 'Add Product',
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
                onPress={submitFn}
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
