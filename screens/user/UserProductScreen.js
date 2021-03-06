import React from 'react'
import { Button, FlatList, Platform, StyleSheet, Alert, View, Text} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductScreen = ({ navigation }) => {
    const userProduct = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch(); 

    const editProductHandler = (id) => {
        navigation.navigate('EditProduct', { productId: id });
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(id));
            }}
        ])
    };

    if (userProduct.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No products found. Try creating some</Text>
            </View>
        )
    }

    return (
        <FlatList 
            data={userProduct} 
            keyExtractor={item => item.id}
            renderItem={ itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title} 
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id);
                    }}
                >
                    <Button 
                            color={Colors.primary} 
                            title="Edit" 
                            onPress={() => {
                                editProductHandler(itemData.item.id);
                        }   } />
                        <Button 
                            color={Colors.primary} 
                            title="Delete" 
                            onPress={() => {deleteHandler(itemData.item.id)}} 
                        />
                </ProductItem> 
            )}
         />
    )
}

export default UserProductScreen

export const userProductScreenOptions = ({ navigation }) => {
    return { 
        title: 'Your Products',
        headerLeft: () => (
        <HeaderButton 
            title= 'cart' 
            name={Platform === 'android' ? "md-menu" : "ios-menu"} 
            onPress={ () => { navigation.toggleDrawer()}}
        />),
        headerRight: () => (
            <HeaderButton 
                title= 'Add' 
                name={Platform === 'android' ? "md-create" : "ios-create"} 
                onPress={ () => { navigation.navigate('EditProduct')}}
            />),
    }
}

const styles = StyleSheet.create({})
