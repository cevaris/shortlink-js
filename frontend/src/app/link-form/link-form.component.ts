import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LinksService } from '../links.service';
import { ApiError, ApiLink, ApiLocationType } from '../types';

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
  // string containing non-specific field form errors
  public formError: string;
  // true if request is in progress
  public submitting: boolean = false;
  private subscription: Subscription;

  constructor(private linkService: LinksService) {
    this.linkForm = new FormGroup({
      link: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  hasError(name: string, error: string) {
    return this.linkForm.get(name).hasError(error);
  }

  // https://juristr.com/blog/2019/02/display-server-side-validation-errors-with-angular/
  onSubmit(data: LinkForm): void {
    this.submitting = true;
    this.formError = ''; // reset previous error

    this.subscription = this.linkService.create(data.link)
      .pipe(
        finalize(() => this.submitting = false)
      )
      .subscribe(
        (response: ApiLink) => {
          console.log('link form created', response);
        },
        (httpError: HttpErrorResponse) => {
          httpError.error.error?.errors.forEach((error: ApiError) => {
            if (error.locationType === ApiLocationType.Parameter && error.location) {
              this.linkForm.get(error.location).setErrors({ [error.reason]: error.message });
            } else if (error.message) {
              this.formError = error.message;
            }
          });
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
