function youtubeApi({ endpoint, query }) {
  let searchParams = new URLSearchParams({
    ...query,
    key: process.env.YOUTUBE_API_KEY,
  });
  return `https://www.googleapis.com/youtube/v3/${endpoint}?${searchParams.toString()}`;
}
