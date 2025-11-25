import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ActionButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  fullWidth?: boolean;
};

const ActionButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  fullWidth = true,
}: ActionButtonProps) => {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent font-bold',
    success: 'bg-success text-success-foreground hover:bg-success/90 shadow-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${fullWidth ? 'w-full' : ''}
        py-4 px-6 rounded-lg font-semibold text-lg
        transition-all duration-300
        ${variants[variant]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
        flex items-center justify-center gap-2
      `}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};

export default ActionButton;
