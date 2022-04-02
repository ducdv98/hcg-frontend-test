import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setLoading } from '@datorama/akita';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PokemonStore } from './pokemon.store';
import { ApiResponse } from '@app/core/interfaces/api-response';
import { Pokemon } from '@app/core/interfaces/pokemon';
import { constructPageCacheKey, defaultPagination, PageCached } from '@app/core/interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl: string;

  constructor(private _http: HttpClient, private _store: PokemonStore) {
    this.baseUrl = environment.apiUrl;
  }

  setLoading(isLoading: boolean) {
    this._store.setLoading(isLoading);
  }

  setCurrentPage(page: number) {
    this._store.update(state => ({
      ...state,
      pokemonsPagination: {
        ...state.pokemonsPagination,
        pageNumber: page
      }
    }));

    this.getPokemons();
  }

  setPageSize(pageSize: number) {
    this._store.update(state => ({
      ...state,
      pageCached: {},
      pokemonsPagination: {
        ...defaultPagination,
        pageSize
      }
    }));

    this.getPokemons();
  }

  updateSearchTerm(searchTerm: string) {
    const isExisted = !!searchTerm && !!this._store._value().ids?.find(name => name.includes(searchTerm));

    if (isExisted) {
      this._store.update(state => {
        const pageCachedKey = constructPageCacheKey(defaultPagination.pageSize, 0, searchTerm);
        return {
          ...state,
          pokemonsPagination: {
            ...defaultPagination,
            searchTerm,
            totalItems: this._store._value().ids?.filter(name => name.includes(searchTerm)).length,
          },
          pageCached: {
            ...state.pageCached,
            [pageCachedKey]: this._store._value().ids?.filter(name => name.includes(searchTerm))
          }
        };
      });

      return;
    }

    this._store.update(state => ({
      ...state,
      pageCached: {},
      pokemonsPagination: {
        ...defaultPagination,
        searchTerm
      },
    }));

    this.getPokemons();
  }

  getPokemons() {
    const pagination = this._store._value().pokemonsPagination;

    const cachedKey = constructPageCacheKey(pagination.pageSize, pagination.pageNumber, pagination.searchTerm);

    if (this._store._value().pageCached.hasOwnProperty(cachedKey)) {
      return;
    }

    this._http
      .get<ApiResponse>(`${this.baseUrl}/pokemon/${pagination.searchTerm}`, {
        params: {
          limit: pagination.pageSize,
          offset: pagination.pageNumber * pagination.pageSize
        }
      })
      .pipe(
        setLoading(this._store),
        tap((res: ApiResponse) => {
          this._store.upsertMany(res.results);

          this._store.update(state => {
            const totalPage = (res.count % pagination.pageSize) === 0
              ? res.count / pagination.pageSize
              : Math.floor(res.count / pagination.pageSize) + 1;

            const pageCached: PageCached = {
              ...state.pageCached,
              [constructPageCacheKey(pagination.pageSize, pagination.pageNumber, pagination.searchTerm)]: res.results.map(p => p.name)
            };

            return {
              ...state,
              pageCached,
              pokemonsPagination: {
                ...state.pokemonsPagination,
                totalPage: totalPage,
                totalItems: res.count
              }
            };
          });
        }),
        catchError((error) => {
          this._store.setError(error);
          return of(error);
        })
      ).subscribe();
  }

  getItems() {
    this._http
      .get<ApiResponse>(`${this.baseUrl}/item?limit=10`)
      .pipe(
        setLoading(this._store),
        tap((res: ApiResponse) => {
          this._store.update(state => ({
            ...state,
            items: res.results
          }));
        }),
        catchError((error) => {
          this._store.setError(error);
          return of(error);
        })
      ).subscribe();
  }

  getPokemon(name: string) {
    this._http
      .get<Pokemon>(`${this.baseUrl}/pokemon/${name}`)
      .pipe(
        setLoading(this._store),
        tap((res: Pokemon) => {
          this._store.setActive(name);
          this._store.update((p => p.name === name), res);
        }),
        catchError((error) => {
          this._store.setError(error);
          return of(error);
        })
      ).subscribe();
  }
}
