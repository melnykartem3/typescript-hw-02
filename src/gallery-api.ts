import axios from 'axios';

export interface User {
  id: string;
  username: string;
  name: string;
}

export interface Urls {
  small: string;
  regular: string;
}

export interface GalleryResponse {
  results: [];
}

export interface Image {
  id: string;
  alt_description: string;
  description: string;
  urls: Urls;
  likes: number;
  user: User;
}

axios.defaults.baseURL = 'https://api.unsplash.com/';
const clientId = '7hxdiYTJvHBC-CTyrdPLd2nDHKqhAo1BrW1f-KawIac';

export const fetchGallery = async (
  query: string,
  page: number,
): Promise<GalleryResponse> => {
  try {
    const response = await axios.get('/search/photos', {
      params: {
        client_id: clientId,
        query: query,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch gallery');
  }
};
