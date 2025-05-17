import React, { useState } from 'react';
import { piDigits, formatDigitsWithLineBreaks } from '../utils/piDigits';
import { BookOpen, Search } from 'lucide-react';

const PiReference: React.FC = () => {
  const [searchDigit, setSearchDigit] = useState('');
  const [highlightPosition, setHighlightPosition] = useState<number | null>(null);
  
  const formattedLines = formatDigitsWithLineBreaks(piDigits);
  
  const handleSearch = () => {
    const position = parseInt(searchDigit, 10);
    if (!isNaN(position) && position >= 1 && position <= 2000) {
      setHighlightPosition(position - 1); // Adjust for 0-based index
      
      // Scroll to the highlighted digit
      setTimeout(() => {
        const element = document.getElementById(`digit-${position - 1}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);
    } else {
      setHighlightPosition(null);
      alert('Please enter a valid position between 1 and 2000.');
    }
  };
  
  return (
    <div className="page-container">
      <h1 className="page-title flex items-center">
        <BookOpen className="mr-2 text-green-600" />
        π Reference (First 2000 Digits)
      </h1>
      
      <div className="mb-6 flex items-center">
        <div className="flex-1 flex items-center">
          <label htmlFor="search" className="mr-2 text-green-800 font-medium">Find position:</label>
          <input
            id="search"
            type="number"
            min="1"
            max="2000"
            value={searchDigit}
            onChange={(e) => setSearchDigit(e.target.value)}
            className="w-24 px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="1-2000"
          />
          <button 
            className="ml-2 btn btn-primary flex items-center text-sm"
            onClick={handleSearch}
          >
            <Search size={16} className="mr-1" />
            Find
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          π = 3.<span className="text-green-600 font-medium">14159...</span>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-green-200 overflow-auto max-h-[60vh]">
        <div className="text-center space-y-2 font-mono">
          {formattedLines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex flex-wrap justify-center">
              {line.map((group, groupIndex) => {
                const startIndex = lineIndex * 20 + groupIndex * 4;
                const lineNumber = Math.floor(startIndex / 20) + 1;
                
                return (
                  <div key={groupIndex} className="relative digit-group">
                    <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {startIndex + 1}
                    </div>
                    {Array.from(group).map((digit, i) => {
                      const index = startIndex + i;
                      const isHighlighted = index === highlightPosition;
                      
                      return (
                        <span
                          id={`digit-${index}`}
                          key={i}
                          className={`${
                            isHighlighted ? 'bg-yellow-300 px-1 rounded-full font-bold' : ''
                          }`}
                        >
                          {digit}
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
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-800 mb-2">About π (Pi):</h3>
        <p className="text-sm text-gray-700">
          Pi (π) is the ratio of a circle's circumference to its diameter. It's an irrational number that continues infinitely without repeating. The first few digits are 3.14159...
        </p>
        <p className="text-sm text-gray-700 mt-2">
          This reference shows the first 2000 decimal places. Memorizing even a small portion of pi is an impressive mental exercise!
        </p>
      </div>
    </div>
  );
};

export default PiReference;