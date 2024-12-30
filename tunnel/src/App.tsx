import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import PlayerLogin from './pages/PlayerLogin';
import PresenterScreen from './pages/PresenterScreen';

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PlayerLogin />} />
          <Route path="/presenter" element={<PresenterScreen />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;