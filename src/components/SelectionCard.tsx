import { ReactNode } from 'react';
import { Check } from 'lucide-react';

type SelectionCardProps = {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'large';
};

const SelectionCard = ({ 
  children, 
  selected, 
  onClick, 
  disabled = false,
  variant = 'default'
}: SelectionCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full p-4 rounded-lg border-2 transition-all duration-300
        ${variant === 'large' ? 'min-h-[120px]' : 'min-h-[80px]'}
        ${
          selected
            ? 'border-secondary bg-secondary/10 shadow-lg scale-[1.02]'
            : 'border-border bg-card hover:border-secondary/50 hover:bg-card-hover'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
        ${selected ? 'animate-bounce-in' : ''}
      `}
    >
      {selected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg z-10 animate-bounce-in">
          <Check className="w-5 h-5 text-success-foreground" />
        </div>
      )}
      {children}
    </button>
  );
};

export default SelectionCard;
