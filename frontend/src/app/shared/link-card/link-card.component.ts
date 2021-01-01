import { Component, Input, OnInit } from '@angular/core';
import { ApiLink } from 'src/app/types';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css']
})
export class LinkCardComponent implements OnInit {

  @Input() link: ApiLink;

  constructor() { }

  ngOnInit(): void {
  }

}
