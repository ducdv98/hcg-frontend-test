import { GameVersion } from './game-version';
import { Generation } from './generation';

export interface Project {
  gameVersions: Array<GameVersion>
  generations: Array<Generation>
}
