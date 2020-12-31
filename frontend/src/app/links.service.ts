import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiLink, ApiResponse } from './types';

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
}
