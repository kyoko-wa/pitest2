import { format } from 'date-fns';

export interface TestResult {
  id: string;
  date: string;
  time: number; // in seconds
  startDigit: number;
  endDigit: number;
  correctCount: number;
  totalCount: number;
  userInput: string;
}

const STORAGE_KEY = 'pi-test-history';
const MAX_HISTORY = 20;

// Get history from local storage
export const getHistory = (): TestResult[] => {
  const historyString = localStorage.getItem(STORAGE_KEY);
  if (!historyString) return [];
  
  try {
    return JSON.parse(historyString);
  } catch (error) {
    console.error('Failed to parse history:', error);
    return [];
  }
};

// Add a new test result to history
export const addToHistory = (result: Omit<TestResult, 'id' | 'date'>): TestResult => {
  const history = getHistory();
  
  const newResult: TestResult = {
    ...result,
    id: Date.now().toString(),
    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  };
  
  // Add new result and limit to MAX_HISTORY items
  const updatedHistory = [newResult, ...history].slice(0, MAX_HISTORY);
  
  // Save to local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  
  return newResult;
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Get a specific test result by ID
export const getTestResult = (id: string): TestResult | undefined => {
  const history = getHistory();
  return history.find(item => item.id === id);
};

// Format time (seconds) as MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};