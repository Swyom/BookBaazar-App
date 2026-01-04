import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

type Props = {
  onPress?: () => void
  title?: string
}

const Skip: React.FC<Props> = ({ onPress, title = 'Skip' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute top-4 right-4 z-50 px-3 py-1 bg-white rounded-full border border-green-600"
      accessibilityRole="button"
    >
      <Text className="text-green-600 font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}

export default Skip