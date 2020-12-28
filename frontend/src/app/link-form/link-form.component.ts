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
  public formError: string;
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
  // TODO: have API return field specific errors
  onSubmit(data: LinkForm): void {
    this.submitting = true;
    this.subscription = this.linkService.create(data.link)
      .pipe(
        finalize(() => this.submitting = false)
      )
      .subscribe(
        (response: ApiLink) => {
          console.log('link form created', response);
        },
        (httpError: HttpErrorResponse) => {
          // console.log(httpError);

          // console.error(httpError.error.error?.errors);
          // console.error(Object.keys(httpError.error.error?.errors));
          // Object.keys(httpError.error.error?.errors)
          //   .forEach(field => {
          //     console.log('got here', field);
          //     this.linkForm.get(field)?.setErrors({
          //       error: httpError.error.error?.errors
          //     });
          //   });


          httpError.error.error?.errors.forEach((error) => {
            console.error(error);
            if (error.locationType === ApiLocationType.Parameter && error.location) {
              const apiError = error as ApiError;
              this.linkForm.get(apiError.location).setErrors({ [apiError.reason]: error.message });
            } else if (error.reason) {
              const apiError = error as ApiError;
              // console.log('setting', { [apiError.reason]: error.message });
              // this.linkForm.setErrors({ [apiError.reason]: error.message });
              this.formError = apiError.message;
              console.error('error', this.formError);
            }
          });

          // console.error('link form error', error);

          // this.linkForm.get('link').setErrors({ error: error.error.message });
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
