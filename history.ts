interface HistoryEntry {
  date: string;
  time: number;
  digits: number;
  isCorrect: boolean;
  mistakes: number;
}

const STORAGE_KEY = 'number-memory-history';

export const addToHistory = (entry: HistoryEntry): void => {
  const history = getHistory();
  history.unshift(entry);
  
  // Keep only the last 50 entries
  if (history.length > 50) {
    history.pop();
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getHistory = (): HistoryEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};