// AppRoutes.tsx
import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import { ThemeProvider } from './Provider/ThemeContext';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LessonPage = lazy(() => import('./pages/LessonPage/LessonPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const Register = lazy(() => import('./pages/UserAuthentication/Register'));
const Login = lazy(() => import('./pages/UserAuthentication/Login'));
const NotFoundPage = lazy(() => import('./pages/ErrorPage/NotFoundPage'));

const AppRoutes = () => {
  return (
    <ThemeProvider>
    <Router>
      <Navbar />
      <Suspense fallback={<Loader/>}>
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
    </ThemeProvider>
  );
};

export default AppRoutes;
