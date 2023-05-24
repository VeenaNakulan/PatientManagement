import { Navigate } from 'react-router-dom';

export const Privaterouting = ({ children }) => {
  const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : '';
  // const Role = localStorage.getItem('role') ? localStorage.getItem('role') : '';
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};
