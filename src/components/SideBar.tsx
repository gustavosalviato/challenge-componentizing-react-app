import '../styles/sidebar.scss';

import { GenreResponseProps } from "../App"
import { Button } from "./Button"
import { useContextMoviesGenres } from '../context/MoviesGenresContext';

interface SideBarProps {
  genres: GenreResponseProps[],
  onSelectGenre: (id: number) => void
  selectedGenreId: number
}

export function SideBar() {
  const { genres, onSelectGenreId, selectedGenreId } = useContextMoviesGenres()
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onSelectGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>

  )
}