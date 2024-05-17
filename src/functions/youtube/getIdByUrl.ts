export function getIdByUrl(url: string): string {
  // Check if URL is from youtube.com/watch?v=VIDEO_ID
  const youtubeComMatch = url.match(/youtube\.com\/watch\?v=(\w+)/);

  // Check if URL is from youtu.be/VIDEO_ID
  const youtuBeMatch = url.match(/youtu\.be\/(\w+)/);
  return youtubeComMatch
    ? youtubeComMatch[1]
    : youtuBeMatch
    ? youtuBeMatch[1]
    : "";
}
