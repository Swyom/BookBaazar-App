import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './../assets/logo'
import BackButton from 'assets/BackButton'
import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions'
import { useFonts } from 'expo-font'
import LoginPanel from 'components/loginPanel'

const LoginScreen = () => {
    const [fontsLoaded] = useFonts({
        Abhaya: require('./../assets/fonts/AbhayaLibre-SemiBold.ttf'),
        Agbalumo: require('./../assets/fonts/Agbalumo-Regular.ttf'),
        Kavivanar: require('./../assets/fonts/Kavivanar-Regular.ttf'),
    })

    if (!fontsLoaded) return null

    return (
        <SafeAreaView className="bg-green-200 h-full w-full">
            <View className='flex-row justify-center items-center'>
                <TouchableOpacity
                    style={{
                        marginTop: responsiveHeight(2),
                        marginLeft: responsiveWidth(4), position: 'absolute', left: 0,
                    }}
                >
                    <BackButton
                        width={responsiveWidth(6)}
                        height={responsiveWidth(6)}
                    />
                </TouchableOpacity>

                <View className="flex justify-center items-center">
                    <Text
                        style={{
                            marginTop: responsiveHeight(2),
                            fontSize: responsiveFontSize(3),
                            fontFamily: 'Abhaya',
                        }}
                    >
                        Login
                    </Text>
                </View>
            </View>

            <View className="flex justify-center items-center mt-2">
                <Logo
                    width={responsiveWidth(40)}
                    height={responsiveWidth(40)} />

            </View>


            <View>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: responsiveFontSize(4),
                        marginTop: responsiveHeight(1),
                        marginHorizontal: responsiveWidth(3),
                        fontFamily: 'Agbalumo',
                    }}
                >
                    Welcome Back!
                </Text>

                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: responsiveFontSize(2),
                        marginTop: responsiveHeight(1.5),
                        marginHorizontal: responsiveWidth(10),
                        fontFamily: 'Kavivanar',
                    }}
                >
                    Enter your Details to access your Bookshelf.
                </Text>
            </View>

            <View>
                <LoginPanel/>
            </View>

            
        </SafeAreaView>
    )
}

export default LoginScreen
