import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

const StartupScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData){
                ///navigation.navigate('Auth')
                dispatch(authActions.setDidTryAL())
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);
            
            if(expirationDate <= new Date() || !token || !userId) {
                ///navigation.navigate('Auth')
                dispatch(authActions.setDidTryAL())
                return;
            } 
            ///navigation.navigate('Shop');
            const expirationTime = expirationDate.getTime() - new Date().getTime();  

            dispatch(authActions.authenticate(userId, token, expirationTime ));
        }

        tryLogin()
    }, [dispatch])
    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}

export default StartupScreen

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
