import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';
import {
  MoviesComponent,
  ConfirmRemoveDialog
} from './components/movies/movies.component';

import { MoviesService } from './services/movies.service';
import { CategoriesService } from './services/categories.service';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieEditComponent,
    ConfirmRemoveDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,

    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule
  ],
  entryComponents: [ConfirmRemoveDialog],
  providers: [MoviesService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
