import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { supabase } from '../lib/supabase'

const ProfileScreen = () => {

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>ProfileScreen</Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#E53935',
          paddingHorizontal: 30,
          paddingVertical: 12,
          borderRadius: 8
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen
