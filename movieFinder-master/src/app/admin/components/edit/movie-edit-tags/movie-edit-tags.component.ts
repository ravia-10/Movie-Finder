import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '@core/models/movie';

@Component({
  selector: 'app-movie-edit-tags',
  templateUrl: './movie-edit-tags.component.html',
  styleUrls: ['./movie-edit-tags.component.css']
})
export class MovieEditTagsComponent implements OnInit {

  newTags = '';
  movie: Movie;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      const dataName = 'movie';
      this.movie = data[dataName].movie;
    });
  }

  // Add the defined tags
  addTags(): void {
    if (this.newTags) {
      const tagArray = this.newTags.split(',');
      this.movie.tags = this.movie.tags ? this.movie.tags.concat(tagArray) : tagArray;
      this.newTags = '';
    }
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.movie.tags.splice(idx, 1);
  }

}
