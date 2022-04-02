import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { debounceTime, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { Pagination } from '@app/core/interfaces/pagination';
import { PokemonService } from '@app/project/state/pokemon/pokemon.service';
import { PokemonQuery } from '@app/project/state/pokemon/pokemon.query';
import { Pokemon } from '@app/core/interfaces/pokemon';
import {
  PokemonDetailsModalComponent
} from '@app/project/components/pokemon-details-modal/pokemon-details-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit, OnDestroy {
  pokemonsPagination$!: Observable<Pagination>;
  pokemons$!: Observable<Array<Pokemon>>;
  loading$!: Observable<boolean>;

  private unsubscribe$ = new Subject<void>();

  searchControl: FormControl;

  constructor(private _pokemonService: PokemonService,
              private _pokemonQuery: PokemonQuery,
              private _nzModalService: NzModalService,
              private viewContainerRef: ViewContainerRef) {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this._pokemonService.getPokemons();
    this.pokemons$ = this._pokemonQuery.pokemonsWithSprite$;
    this.pokemonsPagination$ = this._pokemonQuery.pokemonsPagination$;
    this.loading$ = this._pokemonQuery.isLoading$;

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.unsubscribe$),
      tap(value => this._pokemonService.updateSearchTerm(value))
    ).subscribe();
  }

  onPageChange(index: number): void {
    this._pokemonService.setCurrentPage(index - 1);
  }

  onPageSizeChange(pageSize: number): void {
    this._pokemonService.setPageSize(pageSize);
  }

  showPokemonDetails(pokemon: Pokemon): void {
    this._nzModalService.create({
      nzTitle: pokemon.name,
      nzContent: PokemonDetailsModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: { pokemon },
    });
  }

  onSubmit(): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
