import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'
import * as Location from 'expo-location'
import { supabase } from '../lib/supabase'
import Ionicons from '@expo/vector-icons/Ionicons'
import Avatar from '@/components/Avatar'
import BookShelf from '@/components/BookShelf'
import MyLottie from '@/components/LottieView'


const HomeScreen = () => {
  const [fullName, setFullName] = useState('')
  const [location, setLocation] = useState('')
  const [greeting, setGreeting] = useState('')


  useEffect(() => {
    getUserProfile()
    getUserLocation()
  }, [])

  // greeting

  const getGreetingByTime = () => {
    const hour = new Date().getHours()

    if (hour >= 0 && hour < 12) {
      setGreeting('Good Morning')
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon')
    } else {
      setGreeting('Good Evening')
    }
  }

  useEffect(() => {
    getGreetingByTime()
  }, [])


  // 🔹 Fetch user name
  const getUserProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    if (data?.full_name) {
      setFullName(data.full_name)
    }
  }

  // 🔹 Fetch location
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') return

    const loc = await Location.getCurrentPositionAsync({})
    const address = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    })

    if (address.length > 0) {
      const place = `${address[0].district}, ${address[0].city}, ${address[0].region}`
      setLocation(place)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: responsiveHeight(2) }}>

        {/* 📍 Location */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="location-outline" size={18} color="gray" />
          <Text style={{ marginLeft: 6, color: 'gray' }}>
            {location}
          </Text>
        </View>



        {/* Welcome */}
        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              fontWeight: '500',
              color: 'black',
              marginTop: 6,
            }}
          >
            {greeting},
          </Text>


          {/* User Name */}
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              fontWeight: '500',
              color: 'black',
              marginTop: 7,
            }}
          >
            {fullName}
          </Text>
        <View>
              <MyLottie/>
        </View>

          <View style={{ position:'absolute', marginLeft:310 }}>
            <Avatar />
          </View>
        </View>

        <View>
          <BookShelf/>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
