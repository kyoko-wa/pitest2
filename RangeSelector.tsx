import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { digitRanges } from '../utils/piDigits';
import { BrainCircuit } from 'lucide-react';

const RangeSelector: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedRange } = useAppContext();
  
  const handleRangeSelect = (start: number, end: number) => {
    setSelectedRange({ start, end });
    navigate('/test');
  };
  
  return (
    <div className="page-container">
      <h1 className="page-title flex items-center">
        <BrainCircuit className="mr-2 text-green-600" />
        Select Digit Range
      </h1>
      
      <p className="mb-6 text-gray-600">
        Choose which digits of π you want to practice. The ranges are based on position after the decimal point (3.14159...).
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {digitRanges.map((range, index) => (
          <button
            key={index}
            className="p-4 bg-white border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-green-50"
            onClick={() => handleRangeSelect(range.start, range.end)}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">{range.label}</h3>
            <p className="text-sm text-gray-600">
              {range.end - range.start + 1} digits
            </p>
            <div className="mt-2 text-xs text-gray-500">
              Position {range.start} to {range.end}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-800 mb-2">How to use this app:</h3>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
          <li>Select a digit range to practice</li>
          <li>When ready, press "Start" to begin the timer</li>
          <li>Enter the digits of π from memory</li>
          <li>Press "Stop" when finished to see your results</li>
          <li>Review your history to track progress</li>
        </ol>
      </div>
    </div>
  );
};

export default RangeSelector;