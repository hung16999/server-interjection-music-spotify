export const URL_SEARCH = (query: string): string => {
  return `https://api.spotify.com/v1/search?q=${query}&type=artist`;
};

export const URL_GET_TRACKS_BY_ARTIST = (id: string): string => {
  return `https://api.spotify.com/v1/artists/${id}/top-tracks?market=VN`;
};

export const token =
  'Bearer BQB621bE1vOHnyEMvhluv6tM0QIzX4GRazcxZCoeCszZcjB4FJobm0ptLev1wGPoB3mVxY8kMzXjSDPlIVQCSoJQq87sQqPJlGC4zZDw8Rhr6pHD7rkdNlDgK05nCxNd6SFo1id4p2uZojLhEVprIUNqZhRbWwAUUyrr5FI';
