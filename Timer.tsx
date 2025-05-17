import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  time: number;
  onTimeUpdate: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ isRunning, time, onTimeUpdate }) => {
  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        onTimeUpdate(time + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
      isRunning ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
    }`}>
      <Clock className="h-5 w-5" />
      <span className="font-mono text-lg">{formatTime(time)}</span>
    </div>
  );
};

export default Timer;