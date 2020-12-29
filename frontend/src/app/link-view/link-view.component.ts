import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LinksService } from '../links.service';
import { ApiLink } from '../types';

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
    this.link$ = this.linkService.get(id).pipe(
      finalize(() => this.loading = false)
    );
    this.subscription = this.link$.subscribe(
      () => { },
      (error: HttpErrorResponse) => {
        // this.loadingError = error.error.error.message;
        if (error.error.error?.message) {
          this.renderSnackbar(error.error.error?.message);
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
