import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiLink } from 'src/app/types';
import { LinkCardComponent } from './link-card.component';

describe('LinkCardComponent', () => {
  let component: LinkCardComponent;
  let fixture: ComponentFixture<LinkCardComponent>;

  const link: ApiLink = {
    id: 'testId',
    link: 'http://example.com',
    created_at: new Date().toISOString()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkCardComponent],
      imports: [
        MatCardModule,
        MatSnackBarModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkCardComponent);
    component = fixture.componentInstance;
    component.link = link;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
