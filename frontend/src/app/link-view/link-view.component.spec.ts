import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkViewComponent } from './link-view.component';

describe('LinkViewComponent', () => {
  let component: LinkViewComponent;
  let fixture: ComponentFixture<LinkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkViewComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
