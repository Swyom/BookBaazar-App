import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { fetchingReadingBooks } from '../services/openlibearyservice';

const BookShelf = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  
  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterBooks(searchQuery);
  }, [searchQuery, books]);

  const loadBooks = async () => {
    try {
      const data = await fetchingReadingBooks(); 
      setBooks(data);
      setFilteredBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading books:", error);
      setLoading(false);
    }
  };

  const filterBooks = (query) => {
    if (!query.trim()) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(item => {
      const title = item.work?.title?.toLowerCase() || '';
      const authors = item.work?.author_names?.join(' ').toLowerCase() || '';
      const searchLower = query.toLowerCase();
      
      return title.includes(searchLower) || authors.includes(searchLower);
    });

    setFilteredBooks(filtered);
  };

  const handleRead = (book) => {
    console.log("Opening book:", book.work?.title);
    // Navigate to reading screen with book data
    navigation.navigate('ReadingScreen', { book });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading books...</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      {/* Search Box */}
      <View style={{ marginBottom: 16, paddingHorizontal: 4 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            borderRadius: 10,
            paddingHorizontal: 12,
            height: 45,
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
        >
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 14,
              color: '#1f2937',
            }}
            placeholder="Search books or authors..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Books List */}
      <FlatList
        data={filteredBooks}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => {
          const coverUrl = item.work?.cover_url || item.work?.cover || null;
          const coverId = item.work?.cover_id;
          const imageUrl = coverUrl
            ? // ensure https
              (coverUrl.startsWith('http://') ? coverUrl.replace('http://', 'https://') : coverUrl)
            : coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : 'https://via.placeholder.com/100x150.png?text=No+Cover';

          return (
            <View
              style={{ 
                flex: 1,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                borderRadius: 12,
                padding: 12,
                backgroundColor: '#ffffff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginBottom: 12,
                marginHorizontal: 6,
              }}
            >
              {/* Book Cover Image */}
              <Image
                source={{ uri: imageUrl }}
                style={{ 
                  height: 160, 
                  width: '100%',
                  borderRadius: 8,
                  marginBottom: 10
                }}
                resizeMode="cover"
              />
              
              {/* Book Title */}
              <Text 
                style={{ 
                  fontSize: 13, 
                  fontWeight: '700',
                  marginBottom: 6,
                  color: '#1f2937'
                }}
                numberOfLines={2}
              >
                {item.work?.title}
              </Text>
              
              {/* Author */}
              <Text 
                style={{ 
                  fontSize: 11, 
                  color: '#6b7280',
                  marginBottom: 10
                }}
                numberOfLines={1}
              >
                {item.work?.author_names?.join(", ") || "Unknown Author"}
              </Text>
              
              {/* Read Button */}
              <TouchableOpacity
                onPress={() => handleRead(item)}
                style={{
                  backgroundColor: '#3b82f6',
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginTop: 'auto'
                }}
              >
                <Text style={{ 
                  color: '#ffffff', 
                  fontWeight: '600',
                  fontSize: 13
                }}>
                  Read Book
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: '#6b7280', fontSize: 14 }}>
              No books found matching "{searchQuery}"
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default BookShelf;