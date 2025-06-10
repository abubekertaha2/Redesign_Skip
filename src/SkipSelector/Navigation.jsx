// src/SkipSelector/Navigation.jsx
import { ChevronRight } from 'lucide-react'

const Navigation = ({ currentStep, totalSteps, onBack, onNext, selectedSkip }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white z-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs text-gray-400 px-4 py-2 border-b border-gray-700">
          Imagery and information shown throughout this website may not reflect the exact shape or 
          size specification, colours may vary, options and/or accessories may be featured at 
          additional cost.
        </div>
        
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="font-medium">{selectedSkip.name}</div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-400">£{selectedSkip.price}</span>
              <span className="ml-2 text-sm text-gray-400">{selectedSkip.capacity}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md flex items-center transition-colors"
            >
              Continue
              <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation