import { Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Lottianimation from './../components/Lottianimation'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";



const SplashScreen = () => {
  
  return (
    <SafeAreaView className="flex justify-center items-center h-full w-full bg-green-200">
     <View>
      <Lottianimation />
     </View>
     <View><Text className='text-green-600 mt-20'>Version 1.0 </Text></View>
    </SafeAreaView>
  )
}

export default SplashScreen

