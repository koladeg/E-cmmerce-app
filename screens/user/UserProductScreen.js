import React from 'react'
import { FlatList, Platform, StyleSheet} from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'

const UserProductScreen = () => {
    const userProduct = useSelector(state => state.products.userProducts)

    return (
        <FlatList 
            data={userProduct} 
            keyExtractor={item => item.id}
            renderItem={ itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title} 
                    price={itemData.item.price}
                    onViewDetail={() => {}}
                    onAddToCart={() => {}}
                /> 
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
    }
}

const styles = StyleSheet.create({})
