
import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import { ThemeProvider } from './Context/ThemeContext';
import { NotificationProvider } from './Context/NotificationContext';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LessonContainer = lazy(() => import('./pages/LessonPage/LessonContainer'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const Register = lazy(() => import('./pages/UserAuthentication/Register'));
const Login = lazy(() => import('./pages/UserAuthentication/Login'));
const NotFoundPage = lazy(() => import('./pages/ErrorPage/NotFoundPage'));
const Lesson1 = lazy(() => import('./pages/LessonPage/Lessons/lesson1'));
const Lesson2 = lazy(() => import('./pages/LessonPage/Lessons/lesson2'));
const Lesson3 = lazy(() => import('./pages/LessonPage/Lessons/lesson3'));
const Lesson4 = lazy(() => import('./pages/LessonPage/Lessons/lesson4'));
const Lesson5 = lazy(() => import('./pages/LessonPage/Lessons/lesson5'));
const Lesson6 = lazy(() => import('./pages/LessonPage/Lessons/lesson6'));

const AppRoutes = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
    <Router>
      <Navbar />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lesson" element={<LessonContainer />} />
          <Route path="/lesson1" element={<Lesson1 />} />
          <Route path="/lesson2" element={<Lesson2/>} />
          <Route path="/lesson3" element={<Lesson3/>} />
          <Route path="/lesson4" element={<Lesson4/>} />
          <Route path="/lesson5" element={<Lesson5/>} />
          <Route path="/lesson6" element={<Lesson6/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
    </NotificationProvider>
    </ThemeProvider>
  );
};

export default AppRoutes;
