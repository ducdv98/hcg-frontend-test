import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonItem } from '@app/core/interfaces/pokemon';
import { defaultPagination, PageCached, Pagination } from '@app/core/interfaces/pagination';

export interface PokemonState extends EntityState<Pokemon, string>, ActiveState {
  pokemonsPagination: Pagination;
  pageCached: PageCached;
  items: Array<PokemonItem>;
}

function createInitialState(): PokemonState {
  return {
    active: null,
    pageCached: {},
    pokemonsPagination: defaultPagination,
    items: [],
  } as PokemonState;
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'pokemon',
  idKey: 'name',
})
export class PokemonStore extends EntityStore<PokemonState> {
  constructor() {
    super(createInitialState());
  }
}
