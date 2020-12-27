import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LinksService } from '../links.service';
import { ApiLink } from '../types';

interface LinkForm {
  link: string
}

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.css']
})
export class LinkFormComponent implements OnInit {

  public linkForm: FormGroup;
  submitted: boolean = false;


  constructor(private linkService: LinksService) {
    this.linkForm = new FormGroup({
      link: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  hasError(name: string, error: string) {
    return this.linkForm.controls[name].hasError(error);
  }

  onSubmit(data: LinkForm) {
    console.log('onSubmit called', data);
    this.linkService.create(data.link)
      // .pipe(
      //   tap((apiLink) => console.log('created', apiLink)),
      //   catchError((error) => {
      //     console.error('you got it', error);
      //     return of({} as ApiLink);
      //   })
      // );
      .subscribe(
        response => console.log('you got it', response),
        error => console.error('you got it', error)
      );
  }
}
