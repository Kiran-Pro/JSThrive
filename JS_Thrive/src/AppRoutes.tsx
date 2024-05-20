import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NotificationProvider } from './Context/NotificationContext';
import { ThemeProvider } from './Context/ThemeContext';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const Register = lazy(() => import('./pages/UserAuthentication/Register'));
const Login = lazy(() => import('./pages/UserAuthentication/Login'));
const ForgetPassword = lazy(() => import('./pages/UserAuthentication/ForgetPassword'));
const NotFoundPage = lazy(() => import('./pages/ErrorPage/NotFoundPage'));
const LessonContainer = lazy(() => import('./pages/LessonPage/LessonContainer'));

const Lesson1 = lazy(() => import('./pages/LessonPage/Lessons/Lesson1'));
const Lesson2 = lazy(() => import('./pages/LessonPage/Lessons/Lesson2'));
const Lesson3 = lazy(() => import('./pages/LessonPage/Lessons/Lesson3'));
const Lesson4 = lazy(() => import('./pages/LessonPage/Lessons/Lesson4'));
const Lesson5 = lazy(() => import('./pages/LessonPage/Lessons/Lesson5'));
const Lesson6 = lazy(() => import('./pages/LessonPage/Lessons/Lesson6'));
const Lesson7 = lazy(() => import('./pages/LessonPage/Lessons/Lesson7'));
const Lesson8 = lazy(() => import('./pages/LessonPage/Lessons/Lesson8'));
const Lesson9 = lazy(() => import('./pages/LessonPage/Lessons/Lesson9'));

const AppRoutes = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <Navbar />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lesson" element={<LessonContainer />} />
              <Route path="/lesson1" element={<Lesson1 />} />
              <Route path="/lesson2" element={<Lesson2 />} />
              <Route path="/lesson3" element={<Lesson3 />} />
              <Route path="/lesson4" element={<Lesson4 />} />
              <Route path="/lesson5" element={<Lesson5 />} />
              <Route path="/lesson6" element={<Lesson6 />} />
              <Route path="/lesson7" element={<Lesson7 />} />
              <Route path="/lesson8" element={<Lesson8 />} />
              <Route path="/lesson9" element={<Lesson9 />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgetPass" element={<ForgetPassword />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default AppRoutes;
