import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import Homepage from './components/pages/homepage/homepage.component';
import SinglePage from './components/pages/single page/single-page.component';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/artwork/:id" element={<SinglePage />} />
      </Routes>
    </Router>
  );
}

export default App;
