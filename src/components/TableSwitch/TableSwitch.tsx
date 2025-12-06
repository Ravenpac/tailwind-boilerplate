import { cn } from '@/lib/utils';

interface SwitchProps {
  isChecked: boolean;
  onClick: () => void;
}

const TableSwitch = ({ isChecked, onClick }: SwitchProps) => {
  return (
    <div
      className={cn(
        'flex min-w-10 max-w-10 h-6 items-center px-0.5 rounded-full cursor-pointer transition-all duration-300',
        isChecked ? 'bg-secondary-100' : 'bg-neutral-20',
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'w-5 h-5 flex items-center justify-center bg-white rounded-full transition-all duration-300',
          isChecked ? 'translate-x-4' : 'translate-x-0',
        )}
      />
    </div>
  );
};

export default TableSwitch;
