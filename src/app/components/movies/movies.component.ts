import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  // public variables
  categories: Category[];
  movies: Movie[];

  constructor(
    private moviesService: MoviesService,
    private categoriesService: CategoriesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoriesService
      .getAll()
      .pipe(
        switchMap(categories => {
          this.categories = categories;
          return this.moviesService.getAll();
        }),
        map(movies => {
          this.movies = movies.map(m => ({
            ...m,
            categories: m.category_ids.map(cid =>
              this.categories.find(c => c.id === cid)
            )
          }));
        })
      )
      .subscribe();
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
