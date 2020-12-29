import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-create',
  templateUrl: './link-create.component.html',
  styleUrls: ['./link-create.component.css']
})
export class LinkCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLinkId(linkId: string) {
    console.log('parent received linkId', linkId);
  }
}
