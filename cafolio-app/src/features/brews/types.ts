export interface Brew {
  id: string
  beanId: string
  method: 'espresso' | 'pour-over' | 'french-press' | 'aeropress'
  grindSize: string
  waterTemp: number
  brewTime: number
  rating: number
  notes: string
  createdAt: Date
}

export interface CreateBrewData {
  beanId: string
  method: 'espresso' | 'pour-over' | 'french-press' | 'aeropress'
  grindSize: string
  waterTemp: number
  brewTime: number
  rating: number
  notes: string
}