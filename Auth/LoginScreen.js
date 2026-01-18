import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { supabase } from '../src/lib/supabase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });

      if (error || !data) {
        Alert.alert('Login Failed', error?.message || 'Invalid email or password');
        return;
      }

      Alert.alert('Success', 'Welcome!');
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (err) {
      Alert.alert('Error', err.message || String(err));
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        backgroundColor: '#ffffff',
      }}
    >
      <View style={{ width: '100%', alignItems: 'center' }}>
        {/* Title */}
        <Text
          style={{
            fontSize: responsiveFontSize(3),
            fontWeight: '600',
            marginBottom: responsiveHeight(3),
          }}
        >
          Login
        </Text>

        {/* Email */}
        <Text
          style={{
            alignSelf: 'flex-start',
            fontSize: responsiveFontSize(2),
            marginBottom: responsiveHeight(0.5),
            marginLeft: 14,
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(85),
            backgroundColor: '#e0e0e0',
            paddingHorizontal: responsiveWidth(4),
            borderRadius: 8,
            marginBottom: responsiveHeight(2),
            color: '#000',
          }}
        />

        {/* Password + Forgot */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: responsiveWidth(83),
            marginBottom: responsiveHeight(1),
          }}
        >
          <Text
            style={{
              fontSize: responsiveFontSize(2),
            }}
          >
            Password
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text
              style={{
                color: '#4CAF50',
                fontSize: responsiveFontSize(1.8),
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            height: responsiveHeight(6),
            width: responsiveWidth(85),
            backgroundColor: '#e0e0e0',
            paddingHorizontal: responsiveWidth(4),
            borderRadius: 8,
            marginBottom: responsiveHeight(3),
            color: '#000',
          }}
        />

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#4CAF50',
            width: responsiveWidth(85),
            height: responsiveHeight(6),
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: responsiveHeight(2),
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(2.2),
              fontWeight: '600',
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(2),
          }}
        >
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                color: '#4CAF50',
                fontWeight: '600',
                marginLeft: 5,
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
