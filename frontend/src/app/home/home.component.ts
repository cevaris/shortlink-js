import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LinksService } from '../links.service';
import { ApiLink } from '../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public links$: Observable<ApiLink[]>;
  public subscription: Subscription;
  public loading: boolean = true;

  constructor(private linkService: LinksService) { }

  ngOnInit(): void {
    this.links$ = this.linkService.scan().pipe(
      finalize(() => this.loading = false)
    );
    this.subscription = this.links$.subscribe(
      () => { },
      (error: HttpErrorResponse) => {
        console.error(error.error);
      }
    );
  }
}
