import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const HeaderButton = props => {
    return <Ionicons  color={Platform === 'android' ? 'white' : Colors.primary}  {...props} size={23} 
 />
}

export default HeaderButton

