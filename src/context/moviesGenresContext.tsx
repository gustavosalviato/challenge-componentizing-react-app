import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { GenreResponseProps, MovieProps } from '../App';
import { api } from '../services/api';


interface MoviesGenresContextType {
  genres: GenreResponseProps[]
  movies: MovieProps[]
  onSelectGenreId: (id: number) => void
  selectedGenreId: number
  selectedGenre: GenreResponseProps
}

export const MoviesGenresContext = createContext({} as MoviesGenresContextType)

interface MoviesGenresProviderProps {
  children: ReactNode
}
export function MoviesGenresProvider({ children }: MoviesGenresProviderProps) {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function onSelectGenreId(id: number) {
    setSelectedGenreId(id);
  }


  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <MoviesGenresContext.Provider value={{ genres, movies, onSelectGenreId, selectedGenreId, selectedGenre }}>
      {children}
    </MoviesGenresContext.Provider>
  )
}


export const useContextMoviesGenres = () => useContext(MoviesGenresContext) 