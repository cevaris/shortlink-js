import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiLink } from '../types';

@Component({
  selector: 'app-link-create',
  templateUrl: './link-create.component.html',
  styleUrls: ['./link-create.component.css']
})
export class LinkCreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLinkCreate(link: ApiLink) {
    console.log('parent received linkId', link);
    this.router.navigateByUrl(`links/${link.id}`);
  }
}
