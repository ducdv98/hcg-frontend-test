import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '@app/core/interfaces/pokemon';
import { PokemonService } from '@app/project/state/pokemon/pokemon.service';
import { PokemonQuery } from '@app/project/state/pokemon/pokemon.query';
import { Observable } from 'rxjs';
import { PokemonStore } from '@app/project/state/pokemon/pokemon.store';

@Component({
  selector: 'app-pokemon-details-modal',
  templateUrl: './pokemon-details-modal.component.html',
  styleUrls: ['./pokemon-details-modal.component.scss']
})
export class PokemonDetailsModalComponent implements OnInit, OnDestroy {
  @Input() pokemon!: Pokemon;

  pokemonDetails$!: Observable<Pokemon | undefined>;
  loading$!: Observable<boolean>;


  constructor(private _pokemonService: PokemonService,
              private _pokemonQuery: PokemonQuery,
              private _store: PokemonStore) {
  }

  ngOnInit(): void {
    this._pokemonService.getPokemon(this.pokemon.name);
    this.pokemonDetails$ = this._pokemonQuery.activePokemon$;
    this.loading$ = this._pokemonQuery.isLoading$;
  }

  ngOnDestroy(): void {
    this._store.setActive(null);
  }

}
