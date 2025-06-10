
// src/SkipSelector/Header.jsx
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = ({ steps, onStepClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const stepIcons = {
    1: MapPin,
    2: Trash2,
    3: Truck,
    4: Shield,
    5: Calendar,
    6: CreditCard,
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto ">
        <div className="hidden lg:block bg-gray-800 rounded-lg px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = stepIcons[step.id]
              const isActive = step.completed || step.current
              const isClickable = step.completed || step.current
              
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => isClickable && onStepClick && onStepClick(step.id)}
                    disabled={!isClickable}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                      isClickable 
                        ? 'cursor-pointer hover:bg-gray-700' 
                        : 'cursor-not-allowed'
                    }`}
                  >
                    <IconComponent 
                      size={20} 
                      className={`${
                        isActive ? 'text-blue-400' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isActive ? 'text-blue-400' : 'text-gray-400'
                      }`}
                    >
                      {step.name}
                    </span>
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div className="mx-4 flex-1">
                      <div 
                        className={`h-0.5 w-8 sm:w-12 md:w-16 ${
                          step.completed ? 'bg-blue-400' : 'bg-gray-600'
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex items-center justify-between m-0">
          <div className='w-full'>
            <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900">
                Choose Your Perfect Skip
            </h1>
            <p 
                className="text-center text-gray-600 mt-1 text-sm sm:text-base">
                    Select the skip size that best suits your needs
                </p>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="bg-gray-800 rounded-lg px-4 py-3">
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-between w-full text-white"
            >
              <div className="flex items-center space-x-3">
                {steps.map((step) => {
                  if (step.current) {
                    const IconComponent = stepIcons[step.id]
                    return (
                      <div key={step.id} className="flex items-center space-x-2">
                        <IconComponent size={20} className="text-blue-400" />
                        <span className="text-sm font-medium text-blue-400">{step.name}</span>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Step 3 of 6</span>
                {isMobileMenuOpen ? (
                  <X size={20} className="text-gray-400" />
                ) : (
                  <Menu size={20} className="text-gray-400" />
                )}
              </div>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="mt-2 bg-gray-800 rounded-lg overflow-hidden">
              {steps.map((step, index) => {
                const IconComponent = stepIcons[step.id]
                const isActive = step.completed || step.current
                const isClickable = step.completed || step.current
                
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      if (isClickable && onStepClick) {
                        onStepClick(step.id)
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    disabled={!isClickable}
                    className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                      isClickable 
                        ? 'hover:bg-gray-700' 
                        : 'cursor-not-allowed'
                    } ${index !== steps.length - 1 ? 'border-b border-gray-700' : ''}`}
                  >
                    <IconComponent 
                      size={18} 
                      className={`${
                        isActive ? 'text-blue-400' : 'text-gray-400'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isActive ? 'text-blue-400' : 'text-gray-400'
                      }`}
                    >
                      {step.name}
                    </span>

                    <div className="ml-auto">
                      {step.completed && (
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      )}
                      {step.current && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header