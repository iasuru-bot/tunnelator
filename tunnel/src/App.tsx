import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import PresenterScreen from './pages/PresenterScreen';
import PlayerScreen from './pages/PlayerScreen';
import DataFetcher from './pages/TestScreen';

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PlayerScreen />} />
          <Route path="/test" element={<DataFetcher />} />
          <Route path="/presenter" element={<PresenterScreen />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;