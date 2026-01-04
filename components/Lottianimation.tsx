import { View,Text } from 'react-native'
import LottieView from 'lottie-react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import React, { useEffect, useRef } from 'react'

const Lottianimation = () => {
     const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    animationRef.current?.play() // plays ONCE
  }, [])

    return (
        <View className="flex justify-center items-center">
            <LottieView
                source={{
                    uri: 'https://lottie.host/dc72500e-1b5e-4d6e-82a6-082ac7dac64b/hwVdl5Swoq.lottie',
                }}
                loop={false}
                ref={animationRef}
                style={{
                    height: responsiveHeight(90), // 50% of window height
                    width: responsiveWidth(90),
                }}
            />
        </View>
    )
}

export default Lottianimation
