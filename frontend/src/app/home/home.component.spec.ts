import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let nativeElement;

  let route: ActivatedRoute;
  let spyRoute: jasmine.Spy<(name: string) => string>;

  let snackBar: MatSnackBar;
  let spySnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        InfiniteScrollModule,
        MatListModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    // https://stackoverflow.com/a/59160364/3538289
    route = TestBed.inject(ActivatedRoute);
    spyRoute = spyOn(route.snapshot.queryParamMap, 'get');

    snackBar = TestBed.inject(MatSnackBar);
    spySnackBar = spyOn(snackBar, 'open');

    buildComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should spin while loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeTruthy();

    component.loading = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeFalsy();
  });

  it('should render flash via snackbar', () => {
    const flashMessage = 'test flash message';
    spyRoute.and.returnValue(flashMessage);

    // build after mocking
    buildComponent();

    expect(route.snapshot.queryParamMap.get).toHaveBeenCalledWith('flash');
    expect(snackBar.open).toHaveBeenCalledWith(
      flashMessage,
      '',
      {
        verticalPosition: 'top', horizontalPosition: 'center',
        panelClass: ['mat-toolbar', 'mat-accent']
      }
    )
  });

  function buildComponent() {
    fixture = TestBed.createComponent(HomeComponent);
    nativeElement = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
