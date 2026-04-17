import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DoctorLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;