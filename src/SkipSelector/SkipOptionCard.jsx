// src/SkipSelector/SkipOptionCard.jsx
import { Package, Star, Zap, Check } from 'lucide-react'
const SkipOptionsList = ({ skips, selectedSkip, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Compare Skip Sizes</h2>
        <p className="opacity-90">Choose the perfect size for your project</p>
      </div>

      <div className="p-6">
        <div className="grid gap-4">
          {skips.map((skip) => (
            <div
              key={skip.id}
              onClick={() => onSelect(skip)}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedSkip?.id === skip.id
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {skip.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star size={14} className="mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              {skip.recommended && (
                <div className="absolute -top-3 right-6">
                  <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Zap size={14} className="mr-1" />
                    Recommended
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Package className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{skip.name}</h3>
                    <p className="text-gray-600">{skip.capacity}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      {skip.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">£{skip.price}</div>
                  <div className="text-sm text-gray-500">inc. delivery</div>
                  <div
                    className={`mt-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedSkip?.id === skip.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}
                  >
                    {selectedSkip?.id === skip.id && <Check className="text-white" size={16} />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SkipOptionsList