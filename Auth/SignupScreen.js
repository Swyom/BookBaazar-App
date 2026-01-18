import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { supabase } from '../src/lib/supabase'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'

const SignupScreen = () => {
  const navigation = useNavigation()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!fullName || !normalizedEmail || !password) {
      Alert.alert('Error', 'All fields are required')
      return
    }

    try {
      setLoading(true)

      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: password.trim(),
      })

      if (error) {
        Alert.alert('Signup Failed', error.message)
        return
      }

      if (data?.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            full_name: fullName,
            email: normalizedEmail,
            password:password,
          },
        ])

        if (profileError) {
          Alert.alert('Account Created', 'Please login to continue')
          navigation.replace('Login')
          return
        }
      }

      Alert.alert('Success', 'Account created successfully')
      navigation.replace('Login')
    } catch (err) {
      Alert.alert('Signup Failed', err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: responsiveWidth(5) }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: responsiveFontSize(3), fontWeight: '600', textAlign: 'center', marginBottom: responsiveHeight(3) }}>
          SignUp
        </Text>

        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={{ height: responsiveHeight(6), backgroundColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: responsiveWidth(4), marginBottom: responsiveHeight(2) }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          style={{ height: responsiveHeight(6), backgroundColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: responsiveWidth(4), marginBottom: responsiveHeight(2) }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ height: responsiveHeight(6), backgroundColor: '#e0e0e0', borderRadius: 8, paddingHorizontal: responsiveWidth(4), marginBottom: responsiveHeight(3) }}
        />

        <TouchableOpacity
          onPress={handleSignup}
          disabled={loading}
          style={{ backgroundColor: '#4CAF50', height: responsiveHeight(6), borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: 'white', fontSize: responsiveFontSize(2.2) }}>
            {loading ? 'Creating...' : 'SignUp'}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(2) }}>
          <Text>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#4CAF50', fontWeight: '600' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignupScreen
