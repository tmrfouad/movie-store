import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import {
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  // public variables
  years: number[];
  categories: Category[];
  movies: Movie[];
  filteredMovies: Movie[];

  isLoading: boolean = false;

  textFilter: string;
  yearFilter: number;

  @ViewChild('txtSearch', { static: true }) txtSearch: ElementRef;

  constructor(
    private moviesService: MoviesService,
    private categoriesService: CategoriesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // add listener to search input keyup event and delay the subscription for 1 second
    fromEvent(this.txtSearch.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.isLoading = true;
        this.moviesService
          .search(this.textFilter)
          .subscribe(movies => {
            this.isLoading = false;
            this.mapMoviesCategories(movies);
            this.applyYearFilters();
          });
      });

    // get a list of years
    this.years = this.getYears();
    
    // get categories then movies
    this.categoriesService
      .getAll()
      .pipe(
        switchMap(categories => {
          this.categories = categories;
          return this.moviesService.getAll();
        }),
        map(movies => {
          this.isLoading = false;
          // get categories objects for each movie
          this.mapMoviesCategories(movies);
          this.applyYearFilters();
        })
      )
      .subscribe();
  }

  getYears(startYear?: number): number[] {
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  }

  mapMoviesCategories(movies: Movie[]) {
    this.movies = movies.map(m => ({
      ...m,
      categories: m.category_ids.map(cid =>
        this.categories.find(c => c.id === cid)
      )
    }));
  }

  applyYearFilters() {
    this.filteredMovies = this.yearFilter
      ? this.movies.filter(m => m.year === this.yearFilter)
      : this.movies;
  }

  removeMovie(movie: Movie) {
    const dialogRef = this.dialog.open(ConfirmRemoveDialog, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'remove') {
        this.moviesService.delete(movie.id).subscribe(() => {
          this.movies = this.movies.filter(m => m.id !== movie.id);
        });
      }
    });
  }
}

@Component({
  selector: 'confirm-remove-dialog',
  template: `
    <div>
      <p>
        Are you sure you want to remove this movie?
      </p>
      <button mat-button [mat-dialog-close]="'remove'" cdkFocusInitial>
        Yes
      </button>
      <button mat-button (click)="onNoClick()">No</button>
    </div>
  `
})
export class ConfirmRemoveDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmRemoveDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
