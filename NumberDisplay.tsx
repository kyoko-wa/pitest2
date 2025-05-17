import React from 'react';

interface NumberDisplayProps {
  numbers: string[];
  userInput?: string[];
  showCorrectness?: boolean;
  showEmpty?: boolean;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({
  numbers,
  userInput,
  showCorrectness = false,
  showEmpty = false,
}) => {
  const rows = [];
  for (let i = 0; i < numbers.length; i += 10) {
    const row = numbers.slice(i, i + 10);
    rows.push(row);
  }

  return (
    <div className="space-y-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap justify-center gap-2">
          {row.map((num, index) => {
            const actualIndex = rowIndex * 10 + index;
            const userNum = userInput?.[actualIndex];
            const isEmpty = userNum === undefined || userNum === '';
            const isIncorrect = showCorrectness && (isEmpty || userNum !== num);

            return (
              <div
                key={index}
                className="relative w-14 h-14 flex items-center justify-center bg-amber-50 rounded-lg border border-amber-200"
              >
                <span className="text-xl font-mono">{isEmpty ? '' : (userInput ? userNum : num)}</span>
                {showCorrectness && isIncorrect && (
                  <div className="absolute inset-0 flex items-center justify-center text-red-500 opacity-50">
                    ✖
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NumberDisplay;