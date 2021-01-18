import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../app.module';
import { LinkCreateComponent } from './link-create.component';
import { LinkFormComponent } from './link-form/link-form.component';

describe('LinkCreateComponent', () => {
  let component: LinkCreateComponent;
  let fixture: ComponentFixture<LinkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkCreateComponent, LinkFormComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
