import React, { useState, useRef, useEffect } from 'react';
import { formatDigitsWithLineBreaks } from '../utils/piDigits';

interface DigitInputProps {
  maxLength: number;
  onChange: (input: string) => void;
  value: string;
  disabled?: boolean;
}

const DigitInput: React.FC<DigitInputProps> = ({ 
  maxLength, 
  onChange, 
  value, 
  disabled = false 
}) => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Only accept digits
    if (!/^\d*$/.test(newValue)) return;
    
    // Limit to maxLength
    if (newValue.length > maxLength) return;
    
    onChange(newValue);
    setCursorPosition(e.target.selectionStart || 0);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // For accessibility and improved UX, handle key navigation
    // This could be expanded based on user needs
  };
  
  const formattedLines = formatDigitsWithLineBreaks('0'.repeat(maxLength).slice(0, Math.max(maxLength, value.length)));
  
  return (
    <div className="relative">
      {/* Hidden input for actual text entry */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="opacity-0 absolute top-0 left-0 h-0 w-full"
        maxLength={maxLength}
        inputMode="numeric"
        autoComplete="off"
        aria-label="Pi digit input"
      />
      
      {/* Visual representation of digits */}
      <div className="text-center space-y-4 font-mono cursor-text" onClick={() => inputRef.current?.focus()}>
        {formattedLines.map((line, lineIndex) => (
          <div key={lineIndex} className="flex flex-wrap justify-center">
            {line.map((group, groupIndex) => {
              const startIndex = lineIndex * 20 + groupIndex * 4;
              
              return (
                <div key={groupIndex} className="digit-group">
                  {Array.from('0000').slice(0, group.length).map((_, i) => {
                    const index = startIndex + i;
                    const isActive = index === cursorPosition;
                    const hasValue = index < value.length;
                    
                    return (
                      <span
                        key={i}
                        className={`${
                          isActive ? 'bg-green-200' : ''
                        } ${
                          !hasValue ? 'text-gray-300' : 'text-gray-800'
                        } px-1`}
                      >
                        {hasValue ? value[index] : '_'}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitInput;