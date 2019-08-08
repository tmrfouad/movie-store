import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Movie } from './models/movie';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-store';
  movies: Movie[] = [];
  public movieForm = new FormGroup({
    name: new FormControl('', Validators.required),
    year: new FormControl(null, [
      Validators.required,
      Validators.max(new Date().getFullYear())
    ]),
    budget: new FormControl(null, [Validators.required, Validators.max(3000)])
  });

  constructor(private moviesService: MoviesService, private el: ElementRef) {}

  ngOnInit(): void {
    this.movies = this.moviesService.getAll();
  }

  addMovie() {
    this.moviesService.post(this.movieForm.value);
    this.movies.push(this.movieForm.value);
    this.movieForm.reset();
    this.el.nativeElement.querySelector('#txtName').focus();
  }
}
