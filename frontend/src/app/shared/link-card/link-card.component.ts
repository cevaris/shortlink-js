import { Clipboard } from "@angular/cdk/clipboard";
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiLink } from 'src/app/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css'],
})
export class LinkCardComponent implements OnInit {

  public redirectDomain: string;

  @Input() link: ApiLink;

  constructor(private clipboard: Clipboard, private snackbar: MatSnackBar) {
    this.redirectDomain = environment.redirectDomain;
  }

  ngOnInit(): void { }

  copyToClipboard($event: MouseEvent) {
    const shortLink = `${this.redirectDomain}/${this.link.id}`;
    this.clipboard.copy(shortLink);

    const noAction = '';
    this.snackbar.open(
      `Copied ${shortLink} to clipboard`,
      noAction,
      { verticalPosition: 'top', horizontalPosition: 'center', duration: 3000 }
    );

    // prevent navigation/redirection
    $event.stopPropagation();
  }

  navigateToLink($event: MouseEvent) {
    window.location.href = this.link.link;
    // prevent navigation/redirection
    $event.stopPropagation();
  }
}
