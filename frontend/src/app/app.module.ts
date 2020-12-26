import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LinkFormComponent } from './link-form/link-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
