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

export type DictionaryType = 'brand' | 'variety' | 'process' | 'method' | 'temperature' | 'ratio' | 'grind';

export interface Coffee {
  id: string;
  user_id: string;
  brand_dictionary_id: string;
  variety_dictionary_id: string;
  process_dictionary_id: string;
  photo_path: string;
  region?: string;
  farm?: string;
  price?: number;
  notes?: string;
  created_at: string;
}

export interface CreateCoffeeRequest {
  user_id: string;
  brand_dictionary_id: string;
  variety_dictionary_id: string;
  process_dictionary_id: string;
  photo_path: string;
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
  region?: string;
  farm?: string;
  price?: number;
  notes?: string;
}