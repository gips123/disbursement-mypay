import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BusinessProfileStep } from './BusinessProfileStep';
import { BusinessAddressStep } from './BusinessAddressStep';
import { BusinessCharacteristicsStep } from './BusinessCharacteristicsStep';
import { BankInfoStep } from './BankInfoStep';

interface FormData {
  businessProfile?: any;
  businessAddress?: any;
  businessCharacteristics?: any;
  bankInfo?: any;
}

export function CreateMerchantContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const handleNext = (stepData: any) => {
    const stepNames = ['businessProfile', 'businessAddress', 'businessCharacteristics', 'bankInfo'];
    setFormData(prev => ({
      ...prev,
      [stepNames[currentStep]]: stepData
    }));
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission
      console.log('Final form data:', { ...formData, [stepNames[currentStep]]: stepData });
      // Here you would submit to your API
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessProfileStep
            onNext={handleNext}
            initialData={formData.businessProfile}
          />
        );
      case 1:
        return (
          <BusinessAddressStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData.businessAddress}
          />
        );
      case 2:
        return (
          <BusinessCharacteristicsStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData.businessCharacteristics}
          />
        );
      case 3:
        return (
          <BankInfoStep
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData.bankInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid xl:grid-cols-3 gap-5 lg:gap-9 mb-5 lg:mb-10">
      <div className="lg:col-span-2 space-y-5">
        <div className="space-y-5">
          {renderStep()}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="space-y-5">
          {/* Progress Summary Card */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-medium mb-4">Create Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Business Info</span>
                <span className={`text-sm ${currentStep >= 0 ? 'text-green-600' : 'text-gray-400'}`}>
                  {formData.businessProfile ? '✓' : currentStep === 0 ? 'In Progress' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Business Address</span>
                <span className={`text-sm ${currentStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                  {formData.businessAddress ? '✓' : currentStep === 1 ? 'In Progress' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Business Characteristics</span>
                <span className={`text-sm ${currentStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                  {formData.businessCharacteristics ? '✓' : currentStep === 2 ? 'In Progress' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bank Info</span>
                <span className={`text-sm ${currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                  {formData.bankInfo ? '✓' : currentStep === 3 ? 'In Progress' : 'Pending'}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">
                Step {currentStep + 1} of 4 completed
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="font-medium text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-700 mb-4">
              Contact our support team if you need assistance with merchant registration.
            </p>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-100">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
