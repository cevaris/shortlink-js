import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LinksService } from '../links.service';
import { ApiError, ApiLink } from '../types';

@Component({
  selector: 'app-link-view',
  templateUrl: './link-view.component.html',
  styleUrls: ['./link-view.component.css']
})
export class LinkViewComponent implements OnInit {

  public link$: Observable<ApiLink>;
  public subscription: Subscription;
  public loading: boolean = true;

  constructor(
    private linkService: LinksService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === '') return;

    this.link$ = this.linkService.get(id).pipe(
      finalize(() => this.loading = false)
    );
    this.subscription = this.link$.subscribe(
      () => { },
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
