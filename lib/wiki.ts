/**
 * Wikipedia API Integration
 * 
 * @author Chandravijay Agrawal
 * @twitter @Mehonestperson
 * @url https://twitter.com/Mehonestperson
 */

export type WikiImageResult = {
  imageUrl?: string
  pageUrl?: string
  title?: string
}

async function fetchPageImagesByTitle(title: string, size = 600): Promise<WikiImageResult> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|info&inprop=url&titles=${encodeURIComponent(
    title,
  )}&piprop=thumbnail|original&pithumbsize=${size}&format=json&formatversion=2&origin=*`
  const res = await fetch(url)
  if (!res.ok) return {}
  const data = await res.json()
  const page = data?.query?.pages?.[0]
  if (!page) return {}
  const imageUrl: string | undefined = page?.thumbnail?.source || page?.original?.source
  const pageUrl: string | undefined = page?.fullurl
  return { imageUrl, pageUrl, title: page?.title }
}

async function fetchPageImagesBySearch(query: string, size = 600): Promise<WikiImageResult> {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query,
  )}&srlimit=1&format=json&formatversion=2&origin=*`
  const sRes = await fetch(searchUrl)
  if (!sRes.ok) return {}
  const sData = await sRes.json()
  const first = sData?.query?.search?.[0]
  if (!first?.title) return {}
  return fetchPageImagesByTitle(first.title, size)
}

export async function fetchWikiLeadImage(titleOrQuery: string, size = 600): Promise<WikiImageResult> {
  const direct = await fetchPageImagesByTitle(titleOrQuery, size)
  if (direct.imageUrl) return direct
  return fetchPageImagesBySearch(titleOrQuery, size)
}

export async function getWikipediaLeadImageUrl(titleOrQuery: string, size = 600): Promise<string | undefined> {
  const { imageUrl } = await fetchWikiLeadImage(titleOrQuery, size)
  return imageUrl
}
