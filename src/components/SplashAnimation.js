import React from 'react'
import LottieView from 'lottie-react-native';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions';  




const SplashAnimation = () => {
  const navigation = useNavigation();
  return (
     <SafeAreaView style={{flex:0,justifyContent:'center',alignItems:'center'}}>
       <LottieView
         source={{ uri: 'https://lottie.host/bb06d5b8-a227-41a6-b7c0-9cf676f1e25f/A3rE7YFYay.lottie' }} // example URL
         autoPlay
         loop = {false}
         onAnimationFinish={() => {
          navigation.replace('Login');
        }}
        style={{width:responsiveWidth(110),height:responsiveHeight(70)}}
       />
     </SafeAreaView>
   );
};


export default SplashAnimation