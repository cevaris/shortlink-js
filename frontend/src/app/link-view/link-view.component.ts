import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LinksService } from '../links.service';
import { ApiError, ApiLink } from '../types';

@Component({
  selector: 'app-link-view',
  templateUrl: './link-view.component.html',
  styleUrls: ['./link-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LinkViewComponent implements OnInit {

  public link$: Observable<ApiLink>;
  public subscription: Subscription;
  public loading: boolean = true;

  constructor(
    private linkService: LinksService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private title: Title) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // update page title
    this.title.setTitle(`ShortLink - ${id}`);

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
