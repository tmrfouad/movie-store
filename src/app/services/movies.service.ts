import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor() {}

  getAll(): Movie[] {
    const movies = JSON.parse(localStorage.getItem('movies')) as Movie[];
    return movies || [];
  }

  get(name: string): Movie {
    const movies = JSON.parse(localStorage.getItem('movies')) as Movie[];
    return (movies || []).find(m => m.name === name);
  }

  post(movie: Movie): void {
    const movies = (JSON.parse(localStorage.getItem('movies')) ||
      []) as Movie[];
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  update(updates: Movie): void {
    const movies = (JSON.parse(localStorage.getItem('movies')) ||
      []) as Movie[];
    movies.splice(
      movies.indexOf(movies.find(m => m.name === updates.name)),
      1,
      updates
    );
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  delete(name: string): void {
    const movies = (JSON.parse(localStorage.getItem('movies')) ||
      []) as Movie[];
    movies.splice(movies.indexOf(movies.find(m => m.name === name)), 1);
    localStorage.setItem('movies', JSON.stringify(movies));
  }
}
