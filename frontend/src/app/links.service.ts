import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiLink, ApiResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private API_DOMAIN: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<ApiLink> {
    return this.http.get<ApiResponse<ApiLink>>(`${this.API_DOMAIN}/expand/${id}.json`).pipe(
      map((response) => {
        if (response.data && response.data?.items.length > 0) {
          return response.data.items[0];
        }

        if (response.error) {
          throw response.error;
        }

        throw new Error(`unexpected response ${response}`);
      })
    )
  }

  create(link: string): Observable<ApiLink> {
    const body = { link: link };
    return this.http.post<ApiResponse<ApiLink>>(`${this.API_DOMAIN}/shorten.json`, body).pipe(
      map((response) => {
        if (response.data && response.data?.items.length > 0) {
          return response.data.items[0];
        }

        if (response.error) {
          throw response.error;
        }

        throw new Error(`unexpected response ${response}`);
      }),
    );
  }
}
