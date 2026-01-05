import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'
import { useFonts } from 'expo-font'
import ForgotPassword from './ForgotPassword'

const LoginPanel = () => {
  const [fontsLoaded] = useFonts({
    Abhaya: require('./../assets/fonts/AbhayaLibre-SemiBold.ttf'),
    Agbalumo: require('./../assets/fonts/Agbalumo-Regular.ttf'),
    Kavivanar: require('./../assets/fonts/Kavivanar-Regular.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    <SafeAreaView className="w-full">
      <View className="items-center mt-6">
        <Text
          className="mb-2 text-left w-full px-8"
          style={{ fontSize: responsiveFontSize(2.3), fontFamily: 'Abhaya' }}
        >
          Email or Username
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: responsiveHeight(6),
            width: responsiveWidth(85),
            borderWidth: 1,
            borderColor: '#4B9A65',
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <MaterialIcons name="email" size={22} color="#4B9A65" />
          <TextInput
            placeholder="swyom@gmail.com"
            style={{
              flex: 1,
              marginLeft: responsiveWidth(2),
              fontSize: responsiveFontSize(2),
            }}
          />
        </View>
      </View>

      <View className="items-center mt-6">
        <View
          style={{
            width: responsiveWidth(85),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: responsiveHeight(0.5),
          }}
        >
          <Text style={{ fontSize: responsiveFontSize(2.3), fontFamily: 'Abhaya' }}>
            Password
          </Text>

          <TouchableOpacity>
            <ForgotPassword />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: responsiveHeight(6),
            width: responsiveWidth(85),
            borderWidth: 1,
            borderColor: '#4B9A65',
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <MaterialIcons name="lock" size={22} color="#4B9A65" />
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            style={{
              flex: 1,
              marginLeft: responsiveWidth(2),
              fontSize: responsiveFontSize(2),
            }}
          />
        </View>
      </View>

      <View className="items-center mt-9">
        <TouchableOpacity
          style={{
            backgroundColor: '#4B9A65',
            height: responsiveHeight(6),
            width: responsiveWidth(85),
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: responsiveFontSize(2.3),
              fontFamily: 'Abhaya',
              color: '#FFFFFF',
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View className="mt-7">
          <Text className="text-gray-500">
            -------------------- OR CONTINUE WITH --------------------
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <TouchableOpacity>
          <View
            style={{
              height: responsiveHeight(6),
              width: responsiveWidth(35),
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              height: responsiveHeight(6),
              width: responsiveWidth(35),
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Apple</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center items-center mt-10">
        <Text style={{ fontSize: responsiveFontSize(2) , fontFamily:'Abhaya'}}>
          Don&apos;t have an account?{' '}
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontFamily: 'Abhaya',
              color: '#4B9A65',
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginPanel
