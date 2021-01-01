import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiLink } from '../types';

@Component({
  selector: 'app-link-create',
  templateUrl: './link-create.component.html',
  styleUrls: ['./link-create.component.css']
})
export class LinkCreateComponent implements OnInit {

  constructor(private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('ShortLink - Create');
  }

  onLinkCreate(link: ApiLink) {
    this.router.navigateByUrl(`links/${link.id}`);
  }
}
