import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { MoviesService } from './services/movies.service';
import { AppRoutingModule } from './app-routing.module';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';

@NgModule({
  declarations: [AppComponent, MoviesComponent, MovieEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
