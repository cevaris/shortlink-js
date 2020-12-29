import { Component, OnInit } from '@angular/core';
import { ApiLink } from '../types';

@Component({
  selector: 'app-link-create',
  templateUrl: './link-create.component.html',
  styleUrls: ['./link-create.component.css']
})
export class LinkCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLinkCreate(link: ApiLink) {
    console.log('parent received linkId', link);
  }
}
