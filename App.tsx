import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RangeSelector from './pages/RangeSelector';
import DigitTest from './pages/DigitTest';
import History from './pages/History';
import PiReference from './pages/PiReference';
import TestResults from './pages/TestResults';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <Router>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<RangeSelector />} />
            <Route path="/test" element={<DigitTest />} />
            <Route path="/history" element={<History />} />
            <Route path="/reference" element={<PiReference />} />
            <Route path="/results/:resultId" element={<TestResults />} />
          </Routes>
        </Layout>
      </AppProvider>
    </Router>
  );
}

export default App;