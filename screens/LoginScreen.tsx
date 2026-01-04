import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './../assets/logo' 


const LoginScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}> 
            <View className='flex-1 justify-center items-center'>
                <Text className='mt-4 text-lg font-bold'>Login</Text>
                <Logo width={120} height={120} />
                
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen