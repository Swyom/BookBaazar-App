import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../src/lib/supabase';
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'yourapp://reset-password', // optional redirect URL after reset
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert(
        'Check your email',
        'A password reset link has been sent to your email!'
      );
      navigation.goBack(); // go back to login
    }
  };

  return (
    
    <SafeAreaView style={{flex:0,margin:responsiveWidth(5)}}>

       <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

      <View style={{flex:0,justifyContent:'center',alignItems:'center'}}>
      <Text>Enter your email to reset password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, width: '100%', marginVertical: 10, padding: 10, borderRadius: 5 }}
      />
      <TouchableOpacity
        onPress={handleResetPassword}
        style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5 }}
      >
        <Text style={{ color: 'white' }}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
