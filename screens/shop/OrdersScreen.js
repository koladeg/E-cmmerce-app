import React, { useEffect, useState } from 'react'
import { View, FlatList, Platform, ActivityIndicator, StyleSheet } from 'react-native'
import { DrawerActions } from "@react-navigation/native";

import { useDispatch, useSelector } from 'react-redux'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(ordersActions.fetchOrders()).then (() => {
            setIsLoading(false);
        })
    }, [dispatch])

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size= 'large' color= {Colors.primary} />
            </View>
        )
    }

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

const styles = StyleSheet.create({
    centered:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})


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
