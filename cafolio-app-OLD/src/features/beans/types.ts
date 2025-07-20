export interface Bean {
  id: string
  name: string
  origin: string
  roastLevel: 'light' | 'medium' | 'dark'
  notes: string
  createdAt: Date
}

export interface CreateBeanData {
  name: string
  origin: string
  roastLevel: 'light' | 'medium' | 'dark'
  notes: string
}