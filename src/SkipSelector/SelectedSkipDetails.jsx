//src/SkipSelector/SelectedSkipDetails.jsx
import { Package, Clock, Shield, Check } from "lucide-react"

const SelectedSkipDetails = ({ selectedSkip }) => {
  if (!selectedSkip) return null

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
        <h3 className="text-xl font-bold mb-2">Your Selection</h3>
        <p className="opacity-90">Review your chosen skip</p>
      </div>

      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-24 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <Package className="text-white" size={32} />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">{selectedSkip.name}</h4>
          <p className="text-gray-600">{selectedSkip.capacity}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Skip Size</span>
            <span className="font-semibold">{selectedSkip.size}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Hire Period</span>
            <span className="font-semibold flex items-center">
              <Clock size={16} className="mr-1" />7 days
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Delivery</span>
            <span className="font-semibold text-green-600 flex items-center">
              <Shield size={16} className="mr-1" />
              Included
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Price</span>
            <span className="text-3xl font-bold text-green-600">£{selectedSkip.price}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">All inclusive pricing</p>
        </div>

        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">What's Included:</h5>
          {Array.isArray(selectedSkip.features) && selectedSkip.features.length > 0 ? (
            selectedSkip.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <Check size={16} className="text-green-500 mr-2" />
                {feature}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No features available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectedSkipDetails
