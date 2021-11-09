export type User = {
  id: string
  name: string
  email: string
  token: string
} | null

export type IncomeExpense = {
  [key: string]: number
}

export type PropertyData = {
  propertyId: number
  propertyName: string
  income?: IncomeExpense
  expense?: IncomeExpense
}
