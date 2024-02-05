'use server'

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  )
  const data: Anime[] = await response.json()
  return data
}
export interface Anime {
  id: number
  name: string
  russian: string
  image: Image
  url: string
  kind: string
  score: string
  status: string
  episodes: number
  episodes_aired: number
  aired_on: string
  released_on: string
}

interface Image {
  original: string
  preview: string
  x96: string
  x48: string
}
