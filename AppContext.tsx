import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getDigitRange } from '../utils/piDigits';

interface AppContextType {
  selectedRange: { start: number; end: number } | null;
  setSelectedRange: (range: { start: number; end: number } | null) => void;
  getSelectedDigits: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRange, setSelectedRange] = useState<{ start: number; end: number } | null>(null);

  const getSelectedDigits = (): string => {
    if (!selectedRange) return '';
    return getDigitRange(selectedRange.start, selectedRange.end);
  };

  return (
    <AppContext.Provider
      value={{
        selectedRange,
        setSelectedRange,
        getSelectedDigits,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};