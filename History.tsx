import React from 'react';
import { format } from 'date-fns';
import { X, CheckCircle, XCircle, Play } from 'lucide-react';
import { getHistory, clearHistory } from '../utils/history';

interface HistoryProps {
  onClose: () => void;
  onNewTest: () => void;
}

const History: React.FC<HistoryProps> = ({ onClose, onNewTest }) => {
  const history = getHistory();

  const handleClearHistory = () => {
    if (window.confirm('履歴を削除してもよろしいですか？')) {
      clearHistory();
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-amber-800">履歴</h2>
        <div className="flex space-x-2">
          <button
            onClick={onNewTest}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center"
          >
            <Play className="h-4 w-4 mr-1" />
            新しいテスト
          </button>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              履歴を削除
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          履歴がありません
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div
              key={index}
              className="p-4 bg-amber-50 rounded-lg border border-amber-200"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {format(new Date(entry.date), 'yyyy/MM/dd HH:mm')}
                </div>
                {entry.isCorrect ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    <span>正解</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="h-5 w-5 mr-1" />
                    <span>{entry.mistakes}個のミス</span>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-600">時間: {entry.time}秒</div>
                <div className="text-sm text-gray-600">桁数: {entry.digits}桁</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;