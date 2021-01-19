import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
 
import StartupScreen from '../screens/user/StartupScreen'
import { AuthNavigator, ShopNavigator } from './ShopNavigator'

const AppNavigator = () => {
    // const navRef = useRef()
    const isAuth = useSelector(state => !!state.auth.token)
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin)
    console.log(`isAuth is ${isAuth}`);
    console.log(`didTryAutoLogin is ${didTryAutoLogin}`);

    // useEffect(() => {
    //     if (!isAuth) {
    //         navRef.current.dispatch()
    //     }
    // }, [isAuth])
    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator /> }
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator
