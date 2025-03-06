import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  console.log('Auth state:', isAuthenticated); // Debug log
  
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
