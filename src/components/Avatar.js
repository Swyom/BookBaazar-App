import React from 'react'
import { Image, View } from 'react-native'

const Avatar = ({ seed, size = 48 }) => {
  const safeSeed = seed ? String(seed) : 'guest'
  const avatarUrl = `https://api.dicebear.com/7.x/personas/png?seed=${encodeURIComponent(
    safeSeed
  )}`

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={{ uri: avatarUrl }}
        style={{
          width: '100%',
          height: '100%',
        }}
        resizeMode="contain"
      />
    </View>
  )
}

export default Avatar
