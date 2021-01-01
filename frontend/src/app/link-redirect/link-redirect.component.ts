import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LinksService } from '../links.service';
import { ApiError, ApiLink } from '../types';

@Component({
  selector: 'app-link-redirect',
  templateUrl: './link-redirect.component.html',
  styleUrls: ['./link-redirect.component.css']
})
export class LinkRedirectComponent implements OnInit {

  public link$: Observable<ApiLink>;
  public subscription: Subscription;
  public loading: boolean = true;

  constructor(
    private linkService: LinksService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.link$ = this.linkService.get(id).pipe(
      finalize(() => this.loading = false)
    );
    this.subscription = this.link$.subscribe(
      (link) => {
        // redirect to external web site
        window.location.href = link.link;
      },
      (error: HttpErrorResponse) => {
        const apiError = error.error.error as ApiError;
        if (apiError && apiError.message) {
          this.renderSnackbar(apiError.message);
        } else {
          this.renderSnackbar(error.message);
        }
      }
    );
  }

  renderSnackbar(message: string) {
    const noAction = '';
    this.snackbar.open(
      message,
      noAction,
      { verticalPosition: 'top', horizontalPosition: 'center' }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
