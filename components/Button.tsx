import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = () => {
  return (
    <View>
      <TouchableOpacity className="flex justify-center items-center bg-green-600 px-10 py-3 rounded-lg">
        <Text className="text-white text-3xl font-semibold">
          Next -&gt;
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button
