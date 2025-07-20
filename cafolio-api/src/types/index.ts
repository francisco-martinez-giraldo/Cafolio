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