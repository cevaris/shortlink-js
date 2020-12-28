import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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

  constructor(private linkService: LinksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.link$ = this.linkService.get(id);
    this.subscription = this.link$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
