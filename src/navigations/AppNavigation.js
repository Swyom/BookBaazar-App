import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../../Auth/LoginScreen'
import SignupScreen from '../../Auth/SignupScreen'
import BottomTabs from './BottomTabs'
import ForgotPasswordScreen from '../../Auth/ForgotPasswordScreen'
import SplashScreen from '../../Auth/SplashScreen'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name ="SplashScreen" component={SplashScreen}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
       <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={BottomTabs} />
    </Stack.Navigator>
  )
}

export default AppNavigation
