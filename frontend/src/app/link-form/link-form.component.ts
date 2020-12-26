import { Component, OnInit } from '@angular/core';

class LinkModel {
  link: string
  slug: string
  created_at: Date
}


@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.css']
})
export class LinkFormComponent implements OnInit {

  submitted: boolean = false;

  model: LinkModel = new LinkModel();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('onSubmit called');
  }

  newHero() {
    console.log('newHero called');
  }

}
