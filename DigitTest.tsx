import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import DigitInput from '../components/DigitInput';
import Timer from '../components/Timer';
import { addToHistory } from '../utils/historyStorage';
import { Brain, Play, Square, RotateCcw, ArrowLeft } from 'lucide-react';

const DigitTest: React.FC = () => {
  const navigate = useNavigate();
  const { selectedRange, getSelectedDigits } = useAppContext();
  const [userInput, setUserInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  
  // Get correct digits
  const correctDigits = getSelectedDigits();
  
  useEffect(() => {
    // If no range is selected, redirect to selection page
    if (!selectedRange) {
      navigate('/');
    }
  }, [selectedRange, navigate]);
  
  const handleStart = () => {
    setIsRunning(true);
    setTime(0);
  };
  
  const handleStop = () => {
    setIsRunning(false);
    
    if (!selectedRange) return;
    
    // Calculate results
    let correctCount = 0;
    for (let i = 0; i < correctDigits.length; i++) {
      if (i < userInput.length && userInput[i] === correctDigits[i]) {
        correctCount++;
      }
    }
    
    // Save to history
    const result = addToHistory({
      time,
      startDigit: selectedRange.start,
      endDigit: selectedRange.end,
      correctCount,
      totalCount: correctDigits.length,
      userInput,
    });
    
    // Navigate to results page
    navigate(`/results/${result.id}`);
  };
  
  const handleReset = () => {
    setUserInput('');
    setIsRunning(false);
    setTime(0);
  };
  
  if (!selectedRange) {
    return null;
  }
  
  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-title flex items-center mb-0 pb-0 border-0">
          <Brain className="mr-2 text-green-600" />
          Memory Test
        </h1>
        
        <Timer isRunning={isRunning} time={time} onTimeUpdate={setTime} />
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <p className="text-green-800 font-medium">
          Enter digits {selectedRange.start} to {selectedRange.end} of π
        </p>
      </div>
      
      <div className="mb-8">
        <DigitInput
          maxLength={selectedRange.end - selectedRange.start + 1}
          value={userInput}
          onChange={setUserInput}
          disabled={!isRunning}
        />
      </div>
      
      <div className="flex justify-center space-x-4">
        {!isRunning ? (
          <button 
            className="btn btn-primary flex items-center" 
            onClick={handleStart}
            disabled={isRunning}
          >
            <Play size={18} className="mr-2" />
            Start
          </button>
        ) : (
          <button 
            className="btn btn-danger flex items-center" 
            onClick={handleStop}
            disabled={!isRunning}
          >
            <Square size={18} className="mr-2" />
            Stop
          </button>
        )}
        
        <button 
          className="btn btn-secondary flex items-center" 
          onClick={handleReset}
        >
          <RotateCcw size={18} className="mr-2" />
          Reset
        </button>
        
        <button 
          className="btn btn-secondary flex items-center" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </button>
      </div>
      
      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-medium text-green-800 mb-2">Tips:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Press "Start" to begin the timer and enable input</li>
          <li>Enter digits from memory - no need to enter the decimal point or leading 3</li>
          <li>Press "Stop" when you're done to see your results</li>
          <li>The input only accepts numbers</li>
        </ul>
      </div>
    </div>
  );
};

export default DigitTest;