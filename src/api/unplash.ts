// src/api/unsplash.ts
import axios from 'axios'

// Unsplash API 키를 Authorization 헤더에 담아 보냅니다.
const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNPLASH_ACCESS_KEY}`,
  },
})

/**
 * 1) 랜덤으로 하나 가져오는 방법
 *    GET /photos/random?query={query}&orientation={orientation}
 */
export const fetchRandomPhoto = async (
  query: string,
  orientation: 'landscape' | 'portrait' | 'squarish' = 'landscape'
): Promise<string> => {
  const { data } = await unsplash.get('/photos/random', {
    params: { query, orientation, content_filter: 'low' },
  })
  return data.urls.regular as string
}

/**
 * 2) 검색 결과 중 첫 번째를 가져오는 방법
 *    GET /search/photos?query={query}&per_page=1
 */
export const fetchFirstSearchPhoto = async (
  query: string
): Promise<string | null> => {
  const { data } = await unsplash.get('/search/photos', {
    params: { query, per_page: 1, content_filter: 'low' },
  })
  if (data.results && data.results.length > 0) {
    return data.results[0].urls.regular as string
  }
  return null
}

/**
 * 3) 이미 알고 있는 사진 ID로 가져오는 방법
 *    GET /photos/{id}
 */
export const fetchPhotoById = async (id: string): Promise<string> => {
  const { data } = await unsplash.get(`/photos/${id}`)
  return data.urls.regular as string
}
