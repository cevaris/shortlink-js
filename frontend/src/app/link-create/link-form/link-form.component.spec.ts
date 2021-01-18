import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { LinksService } from 'src/app/links.service';
import { ApiLink } from 'src/app/types';
import { LinkFormComponent } from './link-form.component';

// https://www.amadousall.com/unit-testing-angular-stubs-vs-spies-vs-mocks/
describe('LinkFormComponent', () => {
  const linkService: LinksService = new LinksService(undefined);
  let linkServiceCreateSpy: jasmine.Spy<(link: string) => Observable<ApiLink>>;

  let component: LinkFormComponent;
  let fixture: ComponentFixture<LinkFormComponent>;

  beforeEach(() => {
    linkServiceCreateSpy = spyOn(linkService, 'create');

    TestBed.configureTestingModule({
      declarations: [LinkFormComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: LinksService, useValue: linkService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should successfully build', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.linkForm.valid).toBe(false);
  });

  it('should create ApiLink', () => {
    const link: ApiLink = {
      id: 'testId',
      link: 'http://example.com',
      created_at: new Date().toISOString()
    };

    expect(component.submitting).toBe(false);

    component.linkForm.controls['link'].setValue(link.link);
    expect(component.linkForm.valid).toBe(true);

    linkServiceCreateSpy.and.returnValue(of(link));
    component.linkEmitter.subscribe((v: ApiLink) => {
      expect(component.submitting).toBe(true);
      expect(v).toBe(link);
    });

    component.onSubmit();
    expect(linkService.create).toHaveBeenCalledWith(link.link);
    expect(component.formError).toBe('');

    // unsubscribe forces subscription to resolve and invoke 'finalize()'
    component.subscription.unsubscribe();
    expect(component.submitting).toBe(false);
  });
});
