import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent {

  public movieForm = new FormGroup({
    name: new FormControl('', Validators.required),
    year: new FormControl(null, [
      Validators.required,
      Validators.max(new Date().getFullYear())
    ]),
    budget: new FormControl(null, [Validators.required, Validators.max(3000)])
  });

  constructor(private moviesService: MoviesService, private router: Router) {}

  addMovie() {
    this.moviesService.post(this.movieForm.value);
    this.router.navigate(['']);
  }

}
