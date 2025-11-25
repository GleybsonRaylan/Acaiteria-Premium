import { Check } from 'lucide-react';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="w-full px-4 py-4 bg-card border-b border-border">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step < currentStep
                    ? 'bg-success text-success-foreground'
                    : step === currentStep
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium text-muted-foreground">
                Passo {step}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-1 mx-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    step < currentStep ? 'bg-success w-full' : 'bg-transparent w-0'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
