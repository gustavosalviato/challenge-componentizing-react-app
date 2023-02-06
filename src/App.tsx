import { useEffect, useState } from 'react';
import './styles/global.scss';
import './styles/content.scss';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { MoviesGenresProvider } from './context/MoviesGenresContext'
export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  return (
    <MoviesGenresProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </MoviesGenresProvider>
  )
}