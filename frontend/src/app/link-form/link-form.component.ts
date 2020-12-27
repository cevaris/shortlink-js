import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  private subscription: Subscription;

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

  onSubmit(data: LinkForm): void {
    this.subscription = this.linkService.create(data.link)
      .subscribe(
        (response: ApiLink) => {
          console.log('link form created', response)
        },
        (error: HttpErrorResponse) => {
          console.error('link form error', error.error)
          this.linkForm.controls['link'].setErrors({ error: error.error.message });
        },
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
