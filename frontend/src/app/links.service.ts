import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiLink, ApiResponse } from './types';

export interface Links {
  items: ApiLink[]
  nextPageToken: string | null
}

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  constructor(private http: HttpClient) { }

  get(id: string): Observable<ApiLink> {
    return this.http.get<ApiResponse<ApiLink>>(`${environment.apiDomain}/links/${id}.json`).pipe(
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
    return this.http.post<ApiResponse<ApiLink>>(`${environment.apiDomain}/links.json`, body).pipe(
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

  scan(token?: string): Observable<Links> {
    const tokenValue = token || new Date().toISOString();
    const url = `${environment.apiDomain}/links.json?token=${tokenValue}&limit=10`;

    return this.http.get<ApiResponse<ApiLink>>(url).pipe(
      map((response) => {
        if (response.data) {
          return {
            items: response.data.items,
            nextPageToken: response.data.next_page_token
          };
        }

        if (response.error) {
          throw response.error;
        }

        throw new Error(`unexpected response ${response}`);
      }),
    );
  }
}
