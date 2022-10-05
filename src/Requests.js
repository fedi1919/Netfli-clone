const key = process.env.REACT_APP_MOVIEDB_API_KEY;

const requests = {
  topRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  trendingMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  upcomingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  nowPlayingMovies: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
};

export default requests;
