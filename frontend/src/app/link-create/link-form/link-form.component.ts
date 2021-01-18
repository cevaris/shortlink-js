import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LinksService } from '../../links.service';
import { ApiError, ApiLink, ApiLocationType } from '../../types';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.css']
})
export class LinkFormComponent implements OnInit {

  linkForm: FormGroup;
  // string containing non-specific field form errors
  formError: string;
  // true if request is in progress
  submitting: boolean = false;
  subscription: Subscription;

  // https://angular.io/guide/component-interaction#parent-listens-for-child-event
  @Output() linkEmitter = new EventEmitter<ApiLink>();

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
  onSubmit(): void {
    this.submitting = true;
    this.formError = ''; // reset previous error, if any

    this.subscription = this.linkService.create(this.linkForm.value.link)
      .pipe(
        finalize(() => this.submitting = false),
      )
      .subscribe(
        (apiLink: ApiLink) => this.linkEmitter.emit(apiLink),
        (httpError: HttpErrorResponse) => {
          httpError.error.error?.errors.forEach((error: ApiError) => {
            if (error.location_type === ApiLocationType.Parameter && error.location) {
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
