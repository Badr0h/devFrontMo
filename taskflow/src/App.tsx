import { Routes, Route, Navigate } from 'react-router-dom';
import LoginRedux from './features/auth/LoginRedux';
import DashboardRedux from './pages/DashboardRedux';
import ProjectDetailRedux from './pages/ProjectDetailRedux';
import ProtectedRouteRedux from './components/ProtectedRouteRedux';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRedux />} />
      <Route path="/dashboard" element={
        <ProtectedRouteRedux><DashboardRedux /></ProtectedRouteRedux>
      } />
      <Route path="/projects/:id" element={
        <ProtectedRouteRedux><ProjectDetailRedux /></ProtectedRouteRedux>
      } />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
