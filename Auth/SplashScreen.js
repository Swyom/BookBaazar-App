import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SplashAnimation from '@/components/SplashAnimation'

const SplashScreen = () => {
  return (
  <SafeAreaView style={{flex:0,justifyContent:'center',alignItems:'center',paddingRight:50,paddingTop:50}}>
    <SplashAnimation/>
  </SafeAreaView>
  )
}

export default SplashScreen