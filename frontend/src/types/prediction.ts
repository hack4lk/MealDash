export interface IIgredients {
  name: string
  quantity: string
}

export interface IPrediction {
  meals: string[]
  confidence: number
  ingredients: IIgredients[]
}

export interface IMeal {
  value: string
  label: string
}

export interface IRangeDates {
  startDate?: Date
  endDate?: Date
  key?: string
}
