import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Circle as PiCircle, Clock, History, BookOpen, Home } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <header className="bg-green-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PiCircle size={24} className="text-green-200" />
            <h1 className="text-xl font-bold">π Memory Test</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className={`text-sm font-medium py-1 border-b-2 ${
                    location.pathname === '/' ? 'border-white' : 'border-transparent hover:border-green-300'
                  }`}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/history')}
                  className={`text-sm font-medium py-1 border-b-2 ${
                    location.pathname === '/history' ? 'border-white' : 'border-transparent hover:border-green-300'
                  }`}
                >
                  History
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/reference')}
                  className={`text-sm font-medium py-1 border-b-2 ${
                    location.pathname === '/reference' ? 'border-white' : 'border-transparent hover:border-green-300'
                  }`}
                >
                  π Reference
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-4 px-4 md:px-8">
        {children}
      </main>
      
      <footer className="bg-green-800 text-green-100 py-2">
        <div className="container mx-auto text-center text-sm">
          π Memory Test App &copy; {new Date().getFullYear()}
        </div>
      </footer>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 shadow-lg">
        <ul className="flex justify-around">
          <li className="flex-1">
            <button 
              onClick={() => navigate('/')}
              className={`flex flex-col items-center w-full py-2 ${
                location.pathname === '/' ? 'text-green-700' : 'text-gray-500'
              }`}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => navigate('/history')}
              className={`flex flex-col items-center w-full py-2 ${
                location.pathname === '/history' ? 'text-green-700' : 'text-gray-500'
              }`}
            >
              <History size={20} />
              <span className="text-xs mt-1">History</span>
            </button>
          </li>
          <li className="flex-1">
            <button 
              onClick={() => navigate('/reference')}
              className={`flex flex-col items-center w-full py-2 ${
                location.pathname === '/reference' ? 'text-green-700' : 'text-gray-500'
              }`}
            >
              <BookOpen size={20} />
              <span className="text-xs mt-1">Reference</span>
            </button>
          </li>
        </ul>
      </nav>
      
      {/* Extra padding for mobile to accommodate the bottom navigation */}
      <div className="h-16 md:hidden"></div>
    </div>
  );
};

export default Layout;