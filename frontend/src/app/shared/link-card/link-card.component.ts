import { Component, Input, OnInit } from '@angular/core';
import { ApiLink } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css']
})
export class LinkCardComponent implements OnInit {

  public frontendDomain: string;

  @Input() link: ApiLink;

  constructor() {
    this.frontendDomain = environment.frontendDomain;
  }

  ngOnInit(): void { }

}
