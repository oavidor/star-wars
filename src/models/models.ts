export interface SWAPIResult {
  name?: string;
  title?: string;
  url: string;
}

export interface SWAPIResource {
  resource: string;
  items: SWAPIResult[];
}

export interface Option {
  resource: string;
  items: string[];
}

export interface Person {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  skin_color: string;
  url: string;
  isNew?: boolean;
}
