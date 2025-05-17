import React from 'react';
import { formatDigitsWithLineBreaks } from '../utils/piDigits';

interface DigitDisplayProps {
  digits: string;
  userInput?: string;
  showCorrectness?: boolean;
}

const DigitDisplay: React.FC<DigitDisplayProps> = ({ 
  digits, 
  userInput = '', 
  showCorrectness = false 
}) => {
  const formattedLines = formatDigitsWithLineBreaks(digits);
  
  return (
    <div className="text-center space-y-4 font-mono">
      {formattedLines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex flex-wrap justify-center">
          {line.map((group, groupIndex) => {
            const startIndex = lineIndex * 20 + groupIndex * 4;
            
            return (
              <div key={groupIndex} className="digit-group">
                {Array.from(group).map((digit, i) => {
                  const index = startIndex + i;
                  const userDigit = userInput[index];
                  const isEmpty = userDigit === undefined || userDigit === '';
                  const isIncorrect = showCorrectness && (isEmpty || userDigit !== digit);
                  
                  return (
                    <span
                      key={i}
                      className={`relative ${userInput && !isEmpty ? 'text-gray-900' : ''}`}
                    >
                      {userInput ? (isEmpty ? '_' : userDigit) : digit}
                      {showCorrectness && isIncorrect && (
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 opacity-50">
                          ✖
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DigitDisplay;