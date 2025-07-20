import { format } from 'date-fns'
import type { IMeal, IRangeDates } from '@/types/prediction'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchPrediction = async (meal: IMeal[], range: IRangeDates[]) => {
  const dataToSend = {
    item_lines: meal.map(m => m.value).join(', '),
    date: range[0]?.startDate ? format(range[0].startDate, 'yyyy-MM-dd') : '',
    query: '',
  }

  const res = await fetch(`${BASE_URL}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  })

  const result = await res.json()
  return result
}
