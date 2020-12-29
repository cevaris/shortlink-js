import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRedirectComponent } from './link-redirect.component';

describe('LinkRedirectComponent', () => {
  let component: LinkRedirectComponent;
  let fixture: ComponentFixture<LinkRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
