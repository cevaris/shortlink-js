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

  get(slug: string): Observable<ApiLink> {
    return this.http.get<ApiLink>(`${this.API_DOMAIN}/expand.json?slug=${slug}`).pipe(
      tap(response => console.log(`got link ${response}`)),
    )
  }

  create(link: string): Observable<ApiLink> {
    console.log('LinkService creating link', link);
    const data = { link: link };
    return this.http.post<ApiResponse<ApiLink>>(`${this.API_DOMAIN}/shorten.json`, data).pipe(
      map((response) => {
        if (response.kind === 'link') {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      }),
    );
  }
}
