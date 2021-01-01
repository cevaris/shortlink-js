import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LinkCreateComponent } from './link-create/link-create.component';
import { LinkFormComponent } from './link-create/link-form/link-form.component';
import { LinkRedirectComponent } from './link-redirect/link-redirect.component';
import { LinkViewComponent } from './link-view/link-view.component';
import { LinkCardComponent } from './shared/link-card/link-card.component';

// https://angular.io/guide/router
const appRoutes: Routes = [
  { path: 'links', component: LinkCreateComponent },
  { path: 'links/:id', component: LinkViewComponent },
  { path: ':id', component: LinkRedirectComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LinkFormComponent,
    LinkViewComponent,
    LinkCreateComponent,
    LinkRedirectComponent,
    HomeComponent,
    LinkCardComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
