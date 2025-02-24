import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DashboardSidebar from './DashboardSidebar';
import DashboardMain from './DashboardMain';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardSidebar />
      <DashboardMain />
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  min-height: calc(100vh - var(--navbar-height) - var(--footer-height));
  background-color: #f5f6fa;
  padding-top: 100px;
`;

export default Dashboard;
