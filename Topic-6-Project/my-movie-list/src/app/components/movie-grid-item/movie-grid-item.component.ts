import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-grid-item',
  templateUrl: './movie-grid-item.component.html',
  styleUrls: ['./movie-grid-item.component.scss'],
})
export class MovieGridItemComponent implements OnInit {
  @Input() movie: object;

  constructor() {}

  ngOnInit() {}
}
