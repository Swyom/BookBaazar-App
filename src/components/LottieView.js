import React from 'react';
import LottieView from 'lottie-react-native';
import { SafeAreaView, View, StyleSheet } from 'react-native';

const MyLottie = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={{ uri: 'https://lottie.host/5402b284-787a-4d19-9984-f2bd36053572/w0ABewCZBp.lottie' }} // example URL
        autoPlay
        loop
        style={styles.lottie}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 0, justifyContent: 'center', alignItems: 'center' },
  lottie: { width: 40, height: 40 }, // adjust size
});

export default MyLottie;
