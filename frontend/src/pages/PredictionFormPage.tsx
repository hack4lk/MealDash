import { useState } from 'react'
import Select from 'react-select'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useAuth } from '@/contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

const mealOptions = [
  { value: 'chicken_grill', label: 'Chicken Grill' },
  { value: 'vegetarian_rice', label: 'Vegetarian Rice' },
  { value: 'beef_tacos', label: 'Beef Tacos' },
  { value: 'fish_curry', label: 'Fish Curry' },
]

export default function PredictionFormPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [meal, setMeal] = useState<{ value: string; label: string }[] | null>(
    null,
  )
  const { logout } = useAuth()
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [prediction, setPrediction] = useState<{
    meals: string[]
    confidence: number
    ingredients: { name: string; quantity: string }[]
    test?: string
  } | null>({
    confidence: 90,
    ingredients: [
      { name: 'test', quantity: '50' },
      { name: 'test', quantity: '50' },
      { name: 'test', quantity: '50' },
      { name: 'test', quantity: '50' },
      { name: 'test', quantity: '50' },
      { name: 'test', quantity: '50' },
      { name: 'test', quantity: '50' },
      { name: 'test', quantity: '50' },
    ],
    meals: [' meal 1: 250'],
  })

  const handleSubmit = async () => {
    if (!meal) {
      alert('Please select a meal')
      return
    }

    const dataToSend = {
      item_lines: mealOptions.map(meal => meal.value).join(', '),
      date: format(range[0].startDate, 'yyyy-MM-dd'),
      query: '',
    }

    console.log('dataToSend', dataToSend)

    try {
      setIsLoading(true)
      const res = await fetch('http://localhost:3001/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })
      const result = await res.json()
      const items = result?.answer.split('\n')
      console.log('items', items)

      setPrediction({
        confidence: 90,
        ingredients: [{ name: 'test', quantity: '50' }],
        meals: items,
        test: result?.answer,
      })
    } catch (err) {
      console.error(err)
      setPrediction({
        confidence: 90,
        ingredients: [{ name: 'test', quantity: '50' }],
        meals: ['meail 1: 250 orders'],
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4  border border-gray-300 text-white px-4 py-2 rounded shadow hover:bg-gray-100 transition z-20"
      >
        Logout
      </button>

      <div className="w-full flex items-start justify-center bg-gray-50 p-4 h-[99vh] gap-6">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/background_image.png')`,
          }}
        />
        <div className="w-1/2 h-full bg-white shadow-xl rounded-lg p-8 z-10 flex flex-col">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Plan Your Perfect Meal
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Select a meal and a date range to estimate the food quantity needed.
          </p>
          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">
              Select meal
            </label>
            <Select
              options={mealOptions}
              isMulti
              value={meal}
              onChange={setMeal}
              placeholder="e.g. Chicken Grill"
            />
          </div>
          <label className="block font-medium text-gray-700 mb-2">
            Select date range
          </label>
          <div className="mb-6 flex items-center justify-center">
            <DateRange
              editableDateInputs={true}
              onChange={item => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={range}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-neutral-800 transition"
          >
            Submit
          </button>
        </div>

        <div className="w-1/3 h-full bg-white shadow-xl rounded-lg p-8 z-10 flex flex-col overflow-y-auto">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Prediction Overview
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Based on your selected meal and date range, here is the
              estimation:
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center flex-1">
              <ClipLoader size={50} color="#4f46e5" />
            </div>
          ) : (
            <>
              <div className="bg-gray-100 rounded-md p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  🍽️ Estimated Meals
                </h3>
                <p className="text-xl font-bold text-indigo-600">
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    {prediction?.meals.map(meal => (
                      <li>{meal}</li>
                    ))}
                  </ul>
                </p>
              </div>

              <div className="bg-gray-100 rounded-md p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  📊 Confidence
                </h3>
                <p className="text-xl font-bold text-green-600">
                  {prediction?.confidence}%
                </p>
              </div>

              <div className="bg-gray-100 rounded-md p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  🛒 Ingredients Needed
                </h3>
                <ul
                  className="list-disc list-inside space-y-1 text-gray-600 text-sm"
                  style={{ maxHeight: '280px', overflowY: 'scroll' }}
                >
                  {prediction?.ingredients.map((ing, i) => (
                    <li key={i}>
                      {ing.quantity} of {ing.name}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <p className="text-center text-xs text-gray-400 mt-8">
            Results are estimates based on historical data.
          </p>
        </div>
      </div>
    </>
  )
}
