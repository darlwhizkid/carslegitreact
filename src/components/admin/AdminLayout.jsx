import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <LayoutContainer>
      <AdminSidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 60px); // Accounting for navbar
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
`;

export default AdminLayout;
