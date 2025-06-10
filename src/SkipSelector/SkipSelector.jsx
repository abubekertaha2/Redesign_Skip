
// src/SkipSelector/SkipSelector.jsx
import { useState, useEffect } from "react"
import axios from "axios"

import Header from "./Header"
import SkipOptionsList from "./SkipOptionCard"
import SelectedSkipDetails from "./SelectedSkipDetails"
import Navigation from "./Navigation"

const steps = [
  { id: 1, name: "Postcode", completed: true },
  { id: 2, name: "Waste Type", completed: true },
  { id: 3, name: "Select Skip", current: true },
  { id: 4, name: "Permit Check" },
  { id: 5, name: "Chosen Date" },
  { id: 6, name: "Payment" },
]

const SkipSelector = () => {
  const [skips, setSkips] = useState([])
  const [selectedSkip, setSelectedSkip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSkips()
  }, [])

  const fetchSkips = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        "https://app.wewantwaste.co.uk/api/skips/by-location",
        { params: { postcode: "NR32", area: "Lowestoft" } }
      )

      const data = response.data

      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format from API")
      }

      const mappedSkips = data.map((skip, index) => ({
        id: skip.id || index + 1,
        size: skip.size || `${(index + 1) * 2} Yard`,
        name: `${skip.size || (index + 1) * 2} Yard Skip`,
        capacity: `${skip.hire_period_days || 7} day hire period`,
        price: skip.transport_cost || 200 + index * 50,
        hirePeriodDays: skip.hire_period_days || 7,
        transportCost: skip.transport_cost,
        perTonneCost: skip.per_tonne_cost,
        popular: index === 2,
        recommended: index === 1,
        features: ["Quick Delivery", "Flexible Hire", "All Waste Types"],
      }))

      setSkips(mappedSkips)

      const popularSkip = mappedSkips.find((skip) => skip.popular)
      setSelectedSkip(popularSkip || mappedSkips[0] || null)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Failed to load skip options. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSkipSelect = (skip) => {
    if (selectedSkip && selectedSkip.id === skip.id) {
      setSelectedSkip(null);
    } else {
      setSelectedSkip(skip);
    }
  };

  const handleContinue = () => {
    if (selectedSkip) {
      console.log("Continue with skip:", selectedSkip)
    }
  }

  const handleBack = () => {
    console.log("Going back to previous step")
  }

  const handleStepClick = (stepId) => {
    console.log(`Clicked on step ${stepId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading skip options...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchSkips}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-32">
    {/* <div className="sticky top-0 z-40">
      <Header steps={steps} skips={skips} onStepClick={handleStepClick} />
    </div> */}
    <Header steps={steps} skips={skips} onStepClick={handleStepClick} />
    
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SkipOptionsList skips={skips} selectedSkip={selectedSkip} onSelect={handleSkipSelect} />
        </div>
        <div className="lg:col-span-1">
          <SelectedSkipDetails selectedSkip={selectedSkip} />
        </div>
      </div>
    </div>

    {selectedSkip && (
      <Navigation 
        currentStep={3} 
        totalSteps={6} 
        onBack={handleBack} 
        onNext={handleContinue} 
        isNextDisabled={false}
        selectedSkip={selectedSkip} 
      />
    )}
  </div>
)
}

export default SkipSelector