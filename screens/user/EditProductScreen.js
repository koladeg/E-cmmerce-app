import React, { useCallback, useEffect, useReducer, useState  } from 'react'
import { Platform, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, ActivityIndicator, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE ){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid : updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
}

const EditProductScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()

    const prodId = route.params ? route.params.productId: null;

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch()

    const [formState, dispatchFormState] =  useReducer(formReducer, {
            inputValues: {
                title: editedProduct ? editedProduct.title : '',
                imageUrl: editedProduct ? editedProduct.imageUrl : '',
                description: editedProduct ? editedProduct.description : '',
                price: ''
            }, 
            inputValidities: {
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                description: editedProduct ? true : false,
                title: editedProduct ? true : false,
            }, 
            formIsValid: editedProduct ? true : false,
        });

        useEffect(() => {
            if(error){
                Alert.alert('An error occurred!', error, [{ text: 'Okay'}])
            }
            return () => {
                cleanup
            }
        }, [error])

    
    const submitHandler =  useCallback(   
        async () => {
            if(!formState.formIsValid){
                Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                    { text: 'Okay'}
            ])
                return;
            }
            setError(null)
            setIsLoading(true)
            try{
                if(editedProduct) {
                    await dispatch(
                        productsActions.updateProduct(
                                prodId, 
                                formState.inputValues.title, 
                                formState.inputValues.description, 
                                formState.inputValues.imageUrl
                            ))
                } else {
                    await dispatch(
                        productsActions.createProduct(
                            formState.inputValues.title, 
                            formState.inputValues.description, 
                            formState.inputValues.imageUrl, 
                            +formState.inputValues.price)
                    )
                }
                navigation.goBack()
            } catch (err) {
                setError(err.message)
            }
            
            setIsLoading(false);
            
        },
        [dispatch, prodId, formState],
    )

    useEffect(() => {
        navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const inputChangeHandler = useCallback (( inputIdentifier, inputValue, inputValidity ) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier,
        })
    }, [dispatchFormState])

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color= {Colors.primary}/>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behaviour="padding" keyboardVerticalOffset={100} style={{ flex: 1 }}>
            <ScrollView style={styles.form}>
                <Input 
                    id='title'
                    autoCapitalize='sentences'
                    autoCorrect
                    label='Title'
                    keyboardType='default'
                    errorText='Please enter a valid title!'
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
                <Input 
                    id='imageUrl'
                    label='Image Url'
                    keyboardType='default'
                    errorText='Please enter a valid image url!'
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
                { editedProduct ? null : ( 
                    
                <Input 
                    id='price'
                    label='Price'
                    keyboardType='decimal-pad'
                    errorText='Please enter a valid price!'
                    onInputChange={inputChangeHandler }
                    returnKeyType="next"
                    required
                    min={0.1}
                />
                )}
                <Input 
                    id='description'
                    label='Description'
                    keyboardType='default'
                    errorText='Please enter a valid description!'
                    autoCorrect
                    autoCapitalize='sentences'
                    multiline
                    numberOfLines={3}
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid={!!editedProduct}
                    required
                    minLength={5}
                />
            </ScrollView>
        </KeyboardAvoidingView>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
})
