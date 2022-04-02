import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '@app/core/interfaces/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent implements OnInit {
  @Input() pokemons!: Array<Pokemon> | null;
  @Input() loading: boolean | null = false;
  @Output() showDetails = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onShowDetails(pokemon: Pokemon): void {
    this.showDetails.emit(pokemon);
  }

}
