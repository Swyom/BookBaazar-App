const API_KEY = 'AIzaSyBLVFc8Mcp_IXAIWYSfkS53k06f6H-zKAM';

// Fetch a list of books from Google Books and normalize to the app's `work` shape
export const fetchingReadingBooks = async (query = 'subject:fiction', maxResults = 24) => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();

    const items = json.items || [];
    return items.map((vol) => {
      const info = vol.volumeInfo || {};
      return {
        id: vol.id,
        work: {
          title: info.title || '',
          author_names: info.authors || [],
          cover_url: info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null,
          description: info.description || '',
          previewLink: info.previewLink || null,
          infoLink: info.infoLink || null,
          first_publish_year: info.publishedDate || null,
        },
      };
    });
  } catch (error) {
    console.error('Error fetching books (Google Books):', error);
    return [];
  }
};

export const fetchBookById = async (id) => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(id)}?key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const info = json.volumeInfo || {};
    return {
      id: json.id,
      work: {
        title: info.title || '',
        author_names: info.authors || [],
        cover_url: info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null,
        description: info.description || '',
        previewLink: info.previewLink || null,
        infoLink: info.infoLink || null,
        first_publish_year: info.publishedDate || null,
      },
    };
  } catch (error) {
    console.error('Error fetching book by id (Google Books):', error);
    return null;
  }
};