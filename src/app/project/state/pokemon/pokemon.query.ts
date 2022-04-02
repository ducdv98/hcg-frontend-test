import { PokemonStore, PokemonState } from './pokemon.store';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { combineLatest, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { getPageCachedInfo } from '@app/core/interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class PokemonQuery extends QueryEntity<PokemonState> {
  isLoading$ = this.selectLoading();
  pokemons$ = this.selectAll();
  pokemonsPagination$ = this.select('pokemonsPagination');
  pageCached$ = this.select('pageCached');
  items$ = this.select('items');

  activePokemon$ = this.selectActive(pokemon => {
    return {
      ...pokemon,
      sprite: this.getPokemonSprite(pokemon.url),
    };
  });

  constructor(protected override store: PokemonStore) {
    super(store);
  }

  pokemonsWithSprite$ = combineLatest([
    this.pokemons$,
    this.pageCached$,
    this.pokemonsPagination$,
  ]).pipe(
    map(([pokemons, pageCached, pagination]) => {
        const pageCachedInfo = getPageCachedInfo(pageCached, pagination);

        return pokemons
          .filter(p => pageCachedInfo.includes(p.name))
          .map(p => {
            return {
              ...p,
              sprite: this.getPokemonSprite(p.url)
            };
          });
      }
    )
  );

  itemsWithSprite$ = this.items$.pipe(
    map(items => items
      .map(item => {
        return {
          ...item,
          sprite: this.getPokemonItemSprite(item.name),
        };
      })
    )
  );

  first10Pokemons$ = this.pokemonsWithSprite$.pipe(
    map(pokemons => pokemons.slice(0, 10))
  );

  getPokemonSprite(url: string): string {
    const array = url.split('/');
    const id = array[array.length - 2];

    return `${environment.spriteUrl}/pokemon/${id}.png`;
  }

  getPokemonItemSprite(name: string): string {
    return `${environment.spriteUrl}/items/${name}.png`;
  }
}
