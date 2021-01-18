import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LinksService } from './links.service';
import { ApiKind, ApiLink, ApiReason, ApiResponse } from './types';

describe('LinksService', () => {
  let httpMock: HttpTestingController;
  let service: LinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LinksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get is successful', () => {
    const link: ApiLink = {
      id: 'testId',
      link: 'http://example.com',
      created_at: new Date().toISOString()
    };

    const response: ApiResponse<ApiLink> = {
      data: {
        kind: ApiKind.Link,
        items: [link]
      }
    }

    service.get(link.id).subscribe(
      (response: ApiLink) => {
        expect(response).toEqual(link);
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/links/testId.json');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('get returns error', () => {
    const linkId = 'testId';
    const errorMessage = 'intentional error';
    const response: ApiResponse<ApiLink> = {
      error: {
        code: 503,
        message: 'intentional error',
        errors: [{
          reason: ApiReason.Error,
          message: errorMessage
        }]
      }
    }

    service.get(linkId).subscribe(
      (response: ApiLink) => {
        fail('request should have failed');
      },
      (error: Error) => {
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/links/testId.json');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
