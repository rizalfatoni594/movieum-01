import { createContext, useContext, useEffect, useState } from 'react';

const MovieContext = createContext();

function useMovieContext() {
  const context = useContext(MovieContext);
  return context;
}

function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const storedFavs = localStorage.getItem('favorites');

    if (!storedFavs || storedFavs === 'undefined') return [];

    try {
      return JSON.parse(storedFavs);
    } catch (error) {
      console.log('Failed to parse favorites from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function addToFavorites(movie) {
    setFavorites((prev) => [...prev, movie]);
  }

  function removeFromFavorites(movieId) {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }

  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId);
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export { useMovieContext, MovieProvider };
