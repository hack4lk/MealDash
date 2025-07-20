import { useState } from 'react'
import Select from 'react-select'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useAuth } from '@/contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import type { IMeal, IPrediction, IRangeDates } from '@/types/prediction'
import { fetchPrediction } from '@/services/predictionService'
import toast from 'react-hot-toast'
import { MEALS_LIST } from '@/constants/meals'

export default function PredictionFormPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [meal, setMeal] = useState<IMeal[]>([])
  const [prediction, setPrediction] = useState<IPrediction>()
  const [range, setRange] = useState<IRangeDates[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const handleSubmit = async () => {
    if (isLoading) return
    if (!meal || meal.length === 0) {
      toast.error('Please select a meal')
      return
    }

    try {
      setIsLoading(true)
      const resultPrediction = await fetchPrediction(meal, range)
      setPrediction({
        confidence: resultPrediction.confidence_level,
        ingredients: [],
        meals: resultPrediction.predictions.map(
          (prediction: { item: string; orders: number }) =>
            `${prediction.item}: ${prediction.orders}`,
        ),
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/background_image.png')` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 z-30 text-white border border-white/30 px-4 py-2 rounded hover:bg-white/10 transition"
      >
        Logout
      </button>

      {/* Main content */}
      <div className="z-10 w-full max-w-7xl flex gap-6">
        {/* Form */}
        <div className="w-2/3 bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Plan Your Perfect Meal
          </h2>
          <p className="text-center text-white/70 mb-8">
            Select a meal and a date range to estimate the food quantity needed.
          </p>

          <div className="mb-6">
            <label className="block font-medium text-white mb-2">
              Select meal
            </label>
            <Select
              options={MEALS_LIST}
              isMulti
              value={meal}
              onChange={newValue => setMeal([...newValue])}
              placeholder="e.g. Chicken Grill"
              className="text-black"
            />
          </div>

          <label className="block font-medium text-white mb-2">
            Select date range
          </label>
          <div className="mb-6 flex items-center justify-center">
            <DateRange
              editableDateInputs
              onChange={item => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={range}
            />
          </div>

          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full bg-red-500 hover:bg-white text-white font-semibold py-3 rounded transition-colors"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>

        {/* Prediction */}
        <div className="w-1/3 bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl rounded-lg p-8 overflow-y-auto max-h-[90vh]">
          <div>
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              Prediction Overview
            </h2>
            <p className="text-center text-white/70 mb-6">
              Based on your selected meal and date range, here is the
              estimation:
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center flex-1">
              <ClipLoader size={50} color="#ffffff" />
            </div>
          ) : (
            <>
              <div className="bg-white/10 rounded-md p-4 mb-4 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-1">
                  🍽️ Estimated Meals
                </h3>
                <ul className="list-disc list-inside space-y-1 text-white/90 text-sm">
                  {prediction?.meals.map((meal, i) => (
                    <li key={i}>{meal}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 rounded-md p-4 mb-4 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-1">
                  📊 Confidence
                </h3>
                <p className="text-xl font-bold text-white">
                  {prediction?.confidence}%
                </p>
              </div>

              <div className="bg-white/10 rounded-md p-4 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  🛒 Ingredients Needed
                </h3>
                <p className="text-xl font-bold text-white">Coming Soon...</p>
                {/* <ul className="list-disc list-inside space-y-1 text-white/90 text-sm">
                  {prediction?.ingredients.map((ing, i) => (
                    <li key={i}>
                      {ing.quantity} of {ing.name}
                    </li>
                  ))}
                </ul> */}
              </div>
            </>
          )}

          <p className="text-center text-xs text-white/60 mt-8">
            Results are estimates based on historical data.
          </p>
        </div>
      </div>
    </div>
  )
}
