export interface DictionaryItem {
  id: string;
  type: string;
  value: string;
  image_url?: string;
  order_index: number;
  created_at: string;
}

export interface CreateDictionaryRequest {
  type: string;
  value: string;
  image_url?: string;
  order_index?: number;
}

export type DictionaryType =
  | "brand"
  | "variety"
  | "process"
  | "method"
  | "temperature"
  | "ratio"
  | "grind";

export interface Coffee {
  id: string;
  user_id: string;
  brand_dictionary_id: string;
  variety_dictionary_id: string;
  process_dictionary_id: string;
  photo_path: string;
  public_url: string;
  region?: string;
  farm?: string;
  price?: number;
  notes?: string;
  overall_rating?: number;
  created_at: string;
  brand?: DictionaryItem;
  variety?: DictionaryItem;
  process?: DictionaryItem;
}

export interface CreateCoffeeRequest {
  user_id: string;
  brand_dictionary_id: string;
  variety_dictionary_id: string;
  process_dictionary_id: string;
  photo_path: string;
  public_url: string;
  region?: string;
  farm?: string;
  price?: number;
  notes?: string;
}

export interface UpdateCoffeeRequest {
  brand_dictionary_id?: string;
  variety_dictionary_id?: string;
  process_dictionary_id?: string;
  photo_path?: string;
  public_url?: string;
  region?: string;
  farm?: string;
  price?: number;
  notes?: string;
}

export interface CoffeePreparation {
  id: string;
  user_id: string;
  coffee_id: string;
  method_dictionary_id: string;
  temperature_dictionary_id: string;
  ratio_dictionary_id: string;
  grind_dictionary_id: string;
  ranking: number;
  notes?: string[];
  comments?: string;
  created_at: string;
  coffee?: Coffee;
  method?: DictionaryItem;
  temperature?: DictionaryItem;
  ratio?: DictionaryItem;
  grind?: DictionaryItem;
}

export interface CreateCoffeePreparationRequest {
  user_id: string;
  coffee_id: string;
  method_dictionary_id: string;
  temperature_dictionary_id: string;
  ratio_dictionary_id: string;
  grind_dictionary_id: string;
  ranking: number;
  notes?: string[];
  comments?: string;
}

export interface UpdateCoffeePreparationRequest {
  method_dictionary_id?: string;
  temperature_dictionary_id?: string;
  ratio_dictionary_id?: string;
  grind_dictionary_id?: string;
  ranking?: number;
  notes?: string[];
  comments?: string;
}

export interface CoffeeWithRating extends Coffee {
  overall_rating: number;
}