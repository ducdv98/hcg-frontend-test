export interface GameVersion {
  id: number;
  name: string;
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    }
  }>;
  version_group: {
    name: string;
    url: string;
  }
}
