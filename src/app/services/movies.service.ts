import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}movies`);
  }

  get(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}movies/${id}`);
  }

  search(text: string): Observable<Movie[]> {
    let params = new HttpParams();
    if (text) params = params.set('search', text);
    return this.http.get<Movie[]>(`${this.baseUrl}movies`, { params });
  }

  post(movie: Movie): Observable<Object> {
    return this.http.post(`${this.baseUrl}movies`, movie);
  }

  update(id: number, updates: Movie): Observable<Object> {
    return this.http.put(`${this.baseUrl}movies/${id}`, updates);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}movies/${id}`);
  }
}
