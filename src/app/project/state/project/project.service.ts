import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setLoading } from '@datorama/akita';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectStore } from './project.store';
import { ApiResponse } from '@app/core/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl: string;

  constructor(private _http: HttpClient, private _store: ProjectStore) {
    this.baseUrl = environment.apiUrl;
  }

  setLoading(isLoading: boolean) {
    this._store.setLoading(isLoading);
  }

  getGameVersions() {
    this._http
      .get<ApiResponse>(`${this.baseUrl}/version`)
      .pipe(
        setLoading(this._store),
        tap((res: any) => {
          this._store.update(state => ({
            ...state,
            gameVersions: res.results,
          }));
        }),
        catchError((error) => {
          this._store.setError(error);
          return of(error);
        })
      ).subscribe();
  }

  getGenerations() {
    this._http
      .get<ApiResponse>(`${this.baseUrl}/generation`)
      .pipe(
        setLoading(this._store),
        tap((res: any) => {
          this._store.update(state => ({
            ...state,
            generations: res.results,
          }));
        }),
        catchError((error) => {
          this._store.setError(error);
          return of(error);
        })
      ).subscribe();
  }
}
