import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LessonPage from './pages/LessonPage/LessonPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Navbar from './components/Navbar/Navbar';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
