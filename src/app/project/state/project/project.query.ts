import { ProjectState, ProjectStore } from './project.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class ProjectQuery extends Query<ProjectState> {
  isLoading$ = this.selectLoading();
  all$ = this.select();
  gameVersions$ = this.select('gameVersions');
  generations$ = this.select('generations');

  constructor(protected override store: ProjectStore) {
    super(store);
  }
}
