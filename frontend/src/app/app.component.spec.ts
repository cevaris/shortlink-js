import { TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatListModule,
        MatToolbarModule,
        RouterTestingModule,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'short-link'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const title = TestBed.inject(Title);
    expect(title.getTitle()).toEqual('ShortLink');
  });
});
