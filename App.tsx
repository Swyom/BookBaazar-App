import React from 'react';
import { View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


import './global.css';

export default function App() {
  return (
    <SafeAreaView >
      <OnboardingScreen />
    </SafeAreaView>
  );
}
