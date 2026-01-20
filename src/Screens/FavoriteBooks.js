import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getFavorites, removeFavorite } from '../services/favoritesService'

const FavoriteBooks = () => {
  const [favorites, setFavorites] = useState([])
  const navigation = useNavigation()

  const loadFavorites = async () => {
    const favs = await getFavorites()
    setFavorites(favs)
  }

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) loadFavorites()
  }, [isFocused])

  const handleOpen = (book) => {
    navigation.navigate('ReadingScreen', { book })
  }

  const handleDelete = (id) => {
    Alert.alert('Delete', 'Remove from favorites?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => { const next = await removeFavorite(id); setFavorites(next); } },
    ])
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {favorites.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#6b7280' }}>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpen(item)} style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eef2f7' }}>
              <Image source={{ uri: item.work?.cover_url || (item.work?.cover_id ? `https://covers.openlibrary.org/b/id/${item.work?.cover_id}-S.jpg` : null) }} style={{ width: 48, height: 72, borderRadius: 6, marginRight: 12, backgroundColor: '#e5e7eb' }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#111827' }} numberOfLines={2}>{item.work?.title}</Text>
                <Text style={{ color: '#6b7280', marginTop: 4 }}>{item.work?.author_names?.join(', ')}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ padding: 8 }}>
                <Ionicons name="trash" size={20} color="#ef4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

export default FavoriteBooks