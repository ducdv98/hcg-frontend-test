import { Component, OnInit } from '@angular/core';
import { ProjectService } from './state/project/project.service';
import { Observable } from 'rxjs';
import { GameVersion } from '@app/core/interfaces/game-version';
import { Generation } from '@app/core/interfaces/generation';
import { ProjectQuery } from '@app/project/state/project/project.query';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  isCollapsed: boolean;

  gameVersions$!: Observable<Array<GameVersion>>;
  generations$!: Observable<Array<Generation>>;

  menu = [
    {
      label: 'Home',
      route: '/',
      icon: 'home',
    },
    {
      label: 'Pokémons',
      route: '/pokemons',
      icon: 'dingtalk',
    },
  ];

  constructor(private _projectService: ProjectService,
              private _projectQuery: ProjectQuery) {
    this.isCollapsed = false;
  }

  ngOnInit(): void {
    this._projectService.getGameVersions();
    this._projectService.getGenerations();

    this.gameVersions$ = this._projectQuery.gameVersions$;
    this.generations$ = this._projectQuery.generations$;
  }

}
