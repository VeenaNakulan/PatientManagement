import React from 'react';
import { useSelector } from 'react-redux';
import Admindashboard from './Admindashboard';
import Pateintdashboard from './Pateintdashboard';

const Dashboard = () => {
  const { role } = useSelector((state) => state.loginReducer);
  return (
    <div>
      {role?.role === 'Admin' ? <Admindashboard /> : <Pateintdashboard />}
    </div>
  );
};

export default Dashboard;
