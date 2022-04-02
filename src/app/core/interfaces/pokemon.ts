export interface Pokemon {
  id: number;
  name: string;
  order: string;
  base_experience: number;
  types: Array<PokemonType>;
  abilities: Array<PokemonAbility>;
  weight: number;
  height: number;
  form: {
    name: string;
    url: string
  };
  species: {
    name: string;
    url: string;
  };
  url: string;
  sprite?: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonItem {
  name: string;
  url: string;
  sprite?: string;
}
