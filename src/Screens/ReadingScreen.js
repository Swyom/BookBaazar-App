import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { addFavorite, removeFavorite, isFavorite as checkIsFavorite } from '../services/favoritesService';

const ReadingScreen = ({ route, navigation }) => {
  const { book } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!book?.id) return;
      const fav = await checkIsFavorite(book.id);
      if (mounted) setIsFavorite(!!fav);
    })();
    return () => (mounted = false);
  }, [book]);

  // Refresh favorite state when screen is focused (e.g., user deleted from Favorites screen)
  const isFocused = useIsFocused();
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!book?.id) return;
      const fav = await checkIsFavorite(book.id);
      if (mounted) setIsFavorite(!!fav);
    })();
    return () => (mounted = false);
  }, [isFocused, book]);

  const handleStartReading = () => {
    const previewLink = book?.work?.previewLink || book?.work?.infoLink || (book?.id ? `https://books.google.com/books?id=${book.id}` : null);
    if (previewLink) {
      Linking.openURL(previewLink).catch(() => Alert.alert('Error', 'Could not open preview link'));
      return;
    }

    const bookTitle = book?.work?.title || book?.title || 'Book';
    const archiveUrl = `https://archive.org/search.php?query=${encodeURIComponent(bookTitle)}&mediatype=texts`;
    Linking.openURL(archiveUrl).catch(() => Alert.alert('Error', 'Could not open Internet Archive'));
  };

  const handleAddFavorite = async () => {
    if (!book?.id) return Alert.alert('Error', 'Invalid book');
    try {
      if (isFavorite) {
        await removeFavorite(book.id);
        setIsFavorite(false);
        Alert.alert('Removed', 'Removed from favorites');
      } else {
        await addFavorite(book);
        setIsFavorite(true);
        Alert.alert('Added', 'Added to favorites');
      }
    } catch (e) {
      console.error('favorite toggle error', e);
      Alert.alert('Error', 'Could not update favorites');
    }
  };

  const coverUrl = book?.work?.cover_url || null;
  const coverId = book?.work?.cover_id;
  const imageUrl = coverUrl
    ? (coverUrl.startsWith('http://') ? coverUrl.replace('http://', 'https://') : coverUrl)
    : coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  const title = book?.work?.title || book?.title || 'Untitled';
  const authors = book?.work?.author_names?.join(', ') || 'Unknown Author';
  const description = book?.work?.description || 'No description available';
  const firstPublishYear = book?.work?.first_publish_year || 'Unknown';

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#1f2937" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1f2937', marginLeft: 12, flex: 1 }} numberOfLines={1}>Book Details</Text>
      </View>

      <ScrollView scrollEnabled showsVerticalScrollIndicator style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 30 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          {imageUrl && !imageError ? (
            <Image source={{ uri: imageUrl }} style={{ height: 280, width: 200, borderRadius: 12, backgroundColor: '#e5e7eb' }} resizeMode="contain" onError={() => setImageError(true)} />
          ) : (
            <View style={{ height: 280, width: 200, borderRadius: 12, backgroundColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="book" size={60} color="#9ca3af" />
            </View>
          )}
        </View>

        <Text style={{ fontSize: 22, fontWeight: '800', color: '#1f2937', marginBottom: 8, lineHeight: 28 }}>{title}</Text>
        <Text style={{ fontSize: 15, color: '#6b7280', marginBottom: 4 }}>By <Text style={{ fontWeight: '600' }}>{authors}</Text></Text>
        <Text style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>First published: {firstPublishYear}</Text>

        <View style={{ height: 1, backgroundColor: '#e5e7eb', marginBottom: 16 }} />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>About This Book</Text>
          <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 22 }}>{description}</Text>
        </View>

        <View style={{ gap: 12, marginTop: 20, marginBottom: 30 }}>
          <TouchableOpacity onPress={handleStartReading} style={{ backgroundColor: '#3b82f6', paddingVertical: 14, borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            <Ionicons name="book" size={20} color="#ffffff" />
            <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 16 }}>Start Reading</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAddFavorite} style={{ backgroundColor: isFavorite ? '#f87171' : '#f3f4f6', paddingVertical: 14, borderRadius: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: isFavorite ? '#f87171' : '#e5e7eb' }}>
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} color={isFavorite ? '#ffffff' : '#6b7280'} />
            <Text style={{ color: isFavorite ? '#ffffff' : '#6b7280', fontWeight: '700', fontSize: 16 }}>{isFavorite ? 'Favorited' : 'Add to Favorites'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReadingScreen;
