import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LinkCreateComponent } from './link-create/link-create.component';
import { LinkFormComponent } from './link-create/link-form/link-form.component';
import { LinkViewComponent } from './link-view/link-view.component';
import { LinkRedirectComponent } from './link-redirect/link-redirect.component';

// https://angular.io/guide/router
const appRoutes: Routes = [
  { path: 'links/', component: LinkCreateComponent },
  { path: 'links/:id', component: LinkViewComponent },
  { path: ':id', component: LinkRedirectComponent },
  { path: '**', redirectTo: 'links/' },
];

@NgModule({
  declarations: [
    AppComponent,
    LinkFormComponent,
    LinkViewComponent,
    LinkCreateComponent,
    LinkRedirectComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
