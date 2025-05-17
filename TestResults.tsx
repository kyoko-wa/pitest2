import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestResult, formatTime } from '../utils/historyStorage';
import { getDigitRange } from '../utils/piDigits';
import DigitDisplay from '../components/DigitDisplay';
import { CheckCircle, XCircle, Clock, Award, Home, Repeat } from 'lucide-react';

interface TestResultData {
  id: string;
  date: string;
  time: number;
  startDigit: number;
  endDigit: number;
  correctCount: number;
  totalCount: number;
  userInput: string;
}

const TestResults: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResultData | null>(null);
  const [correctDigits, setCorrectDigits] = useState('');
  
  useEffect(() => {
    if (resultId) {
      const testResult = getTestResult(resultId);
      if (testResult) {
        setResult(testResult);
        // Get correct digits
        const digits = getDigitRange(testResult.startDigit, testResult.endDigit);
        setCorrectDigits(digits);
      } else {
        navigate('/history');
      }
    }
  }, [resultId, navigate]);
  
  if (!result) {
    return <div className="page-container">Loading results...</div>;
  }
  
  const accuracy = result.totalCount > 0 
    ? Math.round((result.correctCount / result.totalCount) * 100) 
    : 0;
  
  const getAccuracyColor = (acc: number) => {
    if (acc >= 90) return 'text-green-600';
    if (acc >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="page-container">
      <h1 className="page-title flex items-center">
        <Award className="mr-2 text-green-600" />
        Test Results
      </h1>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-800 mb-2">Summary</h3>
          <div className="space-y-2">
            <p className="flex items-center">
              <Clock size={16} className="mr-2 text-green-600" />
              Time: <span className="ml-2 font-medium">{formatTime(result.time)}</span>
            </p>
            <p className="flex items-center">
              <span className={`font-bold text-lg ml-2 ${getAccuracyColor(accuracy)}`}>
                {accuracy}% Accuracy
              </span>
            </p>
            <p>
              Digits: <span className="font-medium">{result.startDigit}-{result.endDigit}</span>
            </p>
            <p>
              Correct: <span className="font-medium">{result.correctCount}</span> / 
              <span className="font-medium">{result.totalCount}</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col justify-center items-center bg-white rounded-lg border border-green-200 p-6">
          {accuracy >= 90 ? (
            <>
              <CheckCircle size={48} className="text-green-500 mb-2" />
              <p className="text-lg font-bold text-green-700">Excellent!</p>
              <p className="text-sm text-gray-600 text-center">
                Outstanding memory! Keep up the great work.
              </p>
            </>
          ) : accuracy >= 70 ? (
            <>
              <CheckCircle size={48} className="text-yellow-500 mb-2" />
              <p className="text-lg font-bold text-yellow-700">Good Job!</p>
              <p className="text-sm text-gray-600 text-center">
                You're doing well. Keep practicing to improve further.
              </p>
            </>
          ) : (
            <>
              <XCircle size={48} className="text-red-500 mb-2" />
              <p className="text-lg font-bold text-red-700">Keep Practicing</p>
              <p className="text-sm text-gray-600 text-center">
                With more practice, you'll improve your memory of π.
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-green-800 mb-2">Correct Digits:</h3>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <DigitDisplay digits={correctDigits} />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-green-800 mb-2">Your Input:</h3>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <DigitDisplay 
            digits={correctDigits} 
            userInput={result.userInput} 
            showCorrectness={true}
          />
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button 
          className="btn btn-primary flex items-center" 
          onClick={() => navigate('/')}
        >
          <Home size={18} className="mr-2" />
          New Test
        </button>
        
        <button 
          className="btn btn-secondary flex items-center" 
          onClick={() => navigate('/history')}
        >
          <Clock size={18} className="mr-2" />
          History
        </button>
        
        <button 
          className="btn btn-secondary flex items-center" 
          onClick={() => {
            if (result) {
              navigate('/test');
            }
          }}
        >
          <Repeat size={18} className="mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default TestResults;