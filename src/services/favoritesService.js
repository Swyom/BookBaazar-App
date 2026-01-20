import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites_books_v1';

export const getFavorites = async () => {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('getFavorites error', e);
    return [];
  }
};

export const saveFavorites = async (items = []) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
    return true;
  } catch (e) {
    console.error('saveFavorites error', e);
    return false;
  }
};

export const addFavorite = async (book) => {
  try {
    const favs = await getFavorites();
    const exists = favs.find((f) => f.id === book.id);
    if (exists) return favs;
    const next = [book, ...favs];
    await saveFavorites(next);
    return next;
  } catch (e) {
    console.error('addFavorite error', e);
    return [];
  }
};

export const removeFavorite = async (id) => {
  try {
    const favs = await getFavorites();
    const next = favs.filter((f) => f.id !== id);
    await saveFavorites(next);
    return next;
  } catch (e) {
    console.error('removeFavorite error', e);
    return [];
  }
};

export const isFavorite = async (id) => {
  try {
    const favs = await getFavorites();
    return favs.some((f) => f.id === id);
  } catch (e) {
    console.error('isFavorite error', e);
    return false;
  }
};
