import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import HomeScreen from '../Screens/HomeScreen'
import LibearyScreen from '../Screens/FavoriteBooks'
import AudioBooks from '../Screens/AudioBooks'
import SaleBook from '../Screens/SaleBook'
import ProfileScreen from '../Screens/ProfileScreen'
import FavoriteBooks from '../Screens/FavoriteBooks'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName

          if (route.name === 'Home') iconName = 'home'
          else if (route.name === 'Favorite') iconName = 'star'
          else if (route.name === 'AudioBooks') iconName = 'headset'
          else if (route.name === 'SaleBook') iconName = 'pricetag'
          else if (route.name === 'Profile') iconName = 'person'

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteBooks} />
      <Tab.Screen name="SaleBook" component={SaleBook} />
      <Tab.Screen name="AudioBooks" component={AudioBooks} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabs
