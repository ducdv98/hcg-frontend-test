import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PokemonItem } from '@app/core/interfaces/pokemon';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit {
  @Input() items: Array<PokemonItem> | null = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
