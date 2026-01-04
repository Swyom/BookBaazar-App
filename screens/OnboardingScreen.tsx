import { FlatList, View, Dimensions } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardData from '../components/CardData'
import CardComponent from '../components/CardComponent'
import Button from '../components/Button'
import Skip from '../components/Skip'

const OnboardingScreen = () => {
  const flatListRef = useRef<FlatList<any> | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const indexRef = useRef(0)
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })
  const onViewRef = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0
      indexRef.current = idx
      setCurrentIndex(idx)
    }
  })
  const { width } = Dimensions.get('window')

  useEffect(() => {
    if (CardData.length <= 1) return
    const timer = setInterval(() => {
      let next = indexRef.current + 1
      if (next >= CardData.length) next = 0
      flatListRef.current?.scrollToOffset({ offset: next * width, animated: true })
      indexRef.current = next
      setCurrentIndex(next)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const handleSkip = () => {
    const last = CardData.length - 1
    if (last < 0) return
    flatListRef.current?.scrollToOffset({ offset: last * width, animated: true })
    indexRef.current = last
    setCurrentIndex(last)
  }

  return (
    <SafeAreaView className="flex bg-green-200 justify-center items-center h-full w-full">
      <Skip onPress={handleSkip} />
      <FlatList
        ref={flatListRef}
        data={CardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width }}>{/* ensures each page equals screen width */}
            <CardComponent item={item} />
          </View>
        )}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <View style={{ position: 'absolute', bottom: 24, width: '100%', alignItems: 'center' }}>
        <Button />
      </View>
    </SafeAreaView>
  )
}

export default OnboardingScreen
