import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Project } from '@app/core/interfaces/project';

export type ProjectState = Project;

function createInitialState(): ProjectState {
  return {
    gameVersions: [],
    generations: []
  } as ProjectState;
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'project'
})
export class ProjectStore extends Store<ProjectState> {
  constructor() {
    super(createInitialState());
  }
}
