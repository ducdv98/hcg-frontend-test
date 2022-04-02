import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PokemonService } from '../../state/pokemon/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon, PokemonItem } from '@app/core/interfaces/pokemon';
import { PokemonQuery } from '@app/project/state/pokemon/pokemon.query';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  PokemonDetailsModalComponent
} from '@app/project/components/pokemon-details-modal/pokemon-details-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pokemons$!: Observable<Array<Pokemon>>;
  items$!: Observable<Array<PokemonItem>>;
  videos: Array<string>;

  constructor(private _pokemonService: PokemonService,
              private _pokemonQuery: PokemonQuery,
              private _nzModalService: NzModalService,
              private viewContainerRef: ViewContainerRef) {
    this.videos = [
      'https://www.youtube.com/embed/D0zYJ1RQ-fs',
      'https://www.youtube.com/embed/1roy4o4tqQM',
      'https://www.youtube.com/embed/bILE5BEyhdo',
      'https://www.youtube.com/embed/uBYORdr_TY8',
    ];
  }

  ngOnInit(): void {
    this._pokemonService.getPokemons();
    this._pokemonService.getItems();
    this.pokemons$ = this._pokemonQuery.first10Pokemons$;
    this.items$ = this._pokemonQuery.itemsWithSprite$;

    this.items$.subscribe(console.log)
  }

  showPokemonDetails(pokemon: Pokemon): void {
    this._nzModalService.create({
      nzTitle: pokemon.name,
      nzContent: PokemonDetailsModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: { pokemon },
    });
  }

}
