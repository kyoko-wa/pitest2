import React from 'react';

interface NumberInputProps {
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ length, value, onChange }) => {
  const handleInputChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return;

    const newValue = [...value];
    newValue[index] = inputValue;
    onChange(newValue);

    // Auto-focus next input if a digit was entered
    if (inputValue && index < length - 1) {
      const nextInput = document.getElementById(`number-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const rows = [];
  for (let i = 0; i < length; i += 10) {
    const row = Array.from({ length: Math.min(10, length - i) });
    rows.push(row);
  }

  return (
    <div className="space-y-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap justify-center gap-2">
          {row.map((_, index) => {
            const actualIndex = rowIndex * 10 + index;
            return (
              <input
                key={index}
                id={`number-input-${actualIndex}`}
                type="number"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={value[actualIndex] || ''}
                onChange={(e) => handleInputChange(actualIndex, e.target.value)}
                className="w-14 h-14 text-center text-xl font-mono bg-amber-50 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NumberInput;