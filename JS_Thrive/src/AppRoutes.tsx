// AppRoutes.tsx
import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LessonPage = lazy(() => import('./pages/LessonPage/LessonPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const Register = lazy(() => import('./pages/UserAuthentication/Register'));
const Login = lazy(() => import('./pages/UserAuthentication/Login'));
const NotFoundPage = lazy(() => import('./pages/ErrorPage/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
