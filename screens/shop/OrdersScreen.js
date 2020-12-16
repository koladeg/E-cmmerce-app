import React from 'react'
import { FlatList, Platform } from 'react-native'
import { DrawerActions } from "@react-navigation/native";

import { useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = () => {
    
    const orders = useSelector(state => state.orders.orders)
    return (
        <FlatList 
            data={orders} 
            keyExtractor={item => item.id} 
            renderItem={ itemData => 
                <OrderItem 
                    amount= {itemData.item.totalAmount} 
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />} 
         />
    )
}


export default OrdersScreen

export const ordersScreenOptions = ({ navigation }) => {
    return { 
        title: 'Your Orders',
        headerLeft: () => (
        <HeaderButton 
            title= 'cart' 
            name={Platform === 'android' ? "md-menu" : "ios-menu"} 
            onPress={ () => { navigation.dispatch(DrawerActions.toggleDrawer())}}
        />),
    }
}
