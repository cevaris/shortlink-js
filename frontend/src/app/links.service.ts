import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiKind, ApiLink, ApiResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private API_DOMAIN: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<ApiLink> {
    return this.http.get<ApiLink>(`${this.API_DOMAIN}/expand.json?id=${id}`).pipe(
      tap(response => console.log(`got link ${response}`)),
    )
  }

  create(link: string): Observable<ApiLink> {
    const data = { link: link };
    return this.http.post<ApiResponse<ApiLink>>(`${this.API_DOMAIN}/shorten.json`, data).pipe(
      map((response) => {
        if (response.data) {
          if (response.data?.kind === ApiKind.Link && response.data?.items.length > 0) {
            return response.data.items[0];
          }
        }

        if (response.error) {
          throw response.error;
        }

        throw new Error(`unexpected response ${response}`);
      }),
    );
  }
}
