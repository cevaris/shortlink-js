import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Links, LinksService } from '../links.service';
import { ApiLink } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loading: boolean;
  public links$: Observable<Links>;
  public links = new Array<ApiLink>();

  private subscription: Subscription;
  private nextPageToken: string | null = null;

  constructor(private linkService: LinksService) { }

  ngOnInit(): void {
    this.loadLinks();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onScroll() {
    this.loadLinks();
  }

  loadLinks() {
    this.loading = true;
    this.links$ = this.linkService.scan(this.nextPageToken).pipe(
      finalize(() => this.loading = false)
    );
    this.subscription = this.links$.subscribe(
      (links: Links) => {
        this.nextPageToken = links.nextPageToken;
        this.links = this.links.concat(links.items);
      },
      (error: HttpErrorResponse) => {
        console.error(error.error);
      }
    );
  }
}
