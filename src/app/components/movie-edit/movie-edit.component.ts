import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/services/movies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  // public variables
  movieId: number;
  categories$: Observable<Category[]>;
  loaded: boolean;

  // form controls
  public movieForm = new FormGroup({
    title: new FormControl('', Validators.required),
    year: new FormControl(null, [
      Validators.required,
      Validators.max(new Date().getFullYear())
    ]),
    budget: new FormControl(null, [Validators.required]),
    category_ids: new FormControl(null)
  });

  constructor(
    private moviesService: MoviesService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get all categories
    this.categories$ = this.categoriesService.getAll();

    // if there is an id get the movie to be edited
    this.movieId = +this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.moviesService.get(this.movieId).subscribe((movie: Movie) => {
        this.loaded = true;
        this.movieForm.setValue({
          title: movie.title,
          year: movie.year,
          budget: movie.budget,
          category_ids: movie.category_ids
        });
      });
    } else {
      this.loaded = true;
    }
  }

  saveMovie() {
    if (this.movieId) {
      this.moviesService
        .update(this.movieId, this.movieForm.value)
        .subscribe(() => this.router.navigate(['']));
    } else {
      this.moviesService
        .post(this.movieForm.value)
        .subscribe(() => this.router.navigate(['']));
    }
  }
}
