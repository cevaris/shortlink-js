import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { LinksService } from 'src/app/links.service';
import { ApiLink, ApiLocation, ApiLocationType, ApiReason, ApiResponse } from 'src/app/types';
import { LinkFormComponent } from './link-form.component';

// https://www.amadousall.com/unit-testing-angular-stubs-vs-spies-vs-mocks/
// https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/
describe('LinkFormComponent', () => {
  const linkService: LinksService = new LinksService(undefined);
  let linkServiceCreateSpy: jasmine.Spy<(link: string) => Observable<ApiLink>>;
  const link: ApiLink = {
    id: 'testId',
    link: 'http://example.com',
    created_at: new Date().toISOString()
  };

  let component: LinkFormComponent;
  let fixture: ComponentFixture<LinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

    linkServiceCreateSpy = spyOn(linkService, 'create');
    fixture = TestBed.createComponent(LinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should successfully build', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid if form is empty', () => {
    component.linkForm.get('link').markAsTouched();
    fixture.detectChanges();

    expect(component.linkForm.valid).toBe(false);
    expect(fixture.debugElement.query(By.css('#error-link-required'))).toBeTruthy();
  });

  it('should create ApiLink', () => {
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

  it('should handle link bad request error', async () => {
    const errorMessage = 'intentional error';
    const response: ApiResponse<ApiLink> = {
      error: {
        code: 400,
        message: errorMessage,
        errors: [{
          reason: ApiReason.Invalid,
          message: errorMessage,
          location: ApiLocation.Link,
          location_type: ApiLocationType.Parameter
        }]
      }
    };
    const errorResponse = new HttpErrorResponse({ error: response })

    expect(component.submitting).toBe(false);

    component.linkForm.controls['link'].setValue(link.link);
    expect(component.linkForm.valid).toBe(true);

    linkServiceCreateSpy.and.returnValue(throwError(errorResponse));
    component.linkEmitter.subscribe(
      () => fail('should have thrown')
    );

    component.onSubmit();
    expect(linkService.create).toHaveBeenCalledWith(link.link);
    expect(component.formError).toBe('');
    expect(component.linkForm.get('link').errors)
      .toEqual({ [ApiReason.Invalid]: errorMessage });

    component.subscription.unsubscribe();
    expect(component.submitting).toBe(false);

    // trigger & wait for DOM changes to go into effect.
    component.linkForm.get('link').markAsTouched();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#error-link-invalid'))).toBeTruthy();
  });

  it('should handle generic error', () => {
    const errorMessage = 'intentional error';
    const response: ApiResponse<ApiLink> = {
      error: {
        code: 503,
        message: errorMessage,
        errors: [{
          reason: ApiReason.Error,
          message: errorMessage,
        }]
      }
    };
    const errorResponse = new HttpErrorResponse({ error: response })
    linkServiceCreateSpy.and.returnValue(throwError(errorResponse));
    component.linkEmitter.subscribe(
      () => fail('should have thrown')
    );

    component.linkForm.controls['link'].setValue(link.link);
    expect(component.linkForm.valid).toBe(true);
    expect(component.submitting).toBe(false);

    component.onSubmit();
    expect(linkService.create).toHaveBeenCalledWith(link.link);
    expect(component.formError).toBe(errorMessage);

    component.subscription.unsubscribe();
    expect(component.submitting).toBe(false);

    component.linkForm.get('link').markAsTouched();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#error-form'))).toBeTruthy();
  });
});
