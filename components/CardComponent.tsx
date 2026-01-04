import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'

const CardComponent = ({ item }: { item: any }) => {
  const ImageComponent = item.Image
  const titleWords = item.title.split(' ')

  return (
    <SafeAreaView className="items-center">
      <View className="flex justify-center items-center">
        <ImageComponent
          width={responsiveWidth(90)}
          height={responsiveHeight(30)}
        />

        <Text
          style={{ fontSize: responsiveFontSize(4.5) }}
          className="font-bold text-center px-6 mt-10"
        >
          {titleWords.map((word: string, index: number) => {
            const cleanWord = word.replace(/[.,!]/g, '')
            const isHighlighted =
              item.highlightTitleWords?.includes(cleanWord)

            return (
              <Text
                key={index}
                className={isHighlighted ? 'text-green-600' : ''}
              >
                {word + ' '}
              </Text>
            )
          })}
        </Text>

        <Text
          style={{ fontSize: responsiveFontSize(3.1) }}
          className="text-center font-medium text-green-600 px-6 mt-6"
        >
          {item.description}
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default CardComponent
