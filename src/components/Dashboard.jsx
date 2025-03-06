import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DashboardSidebar from './DashboardSidebar';
import DashboardMain from './DashboardMain';
import { fetchWithAuth } from '../utils/api';
import { API_URL } from '../config';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}/api/users/me`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }
      
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/');
      }
    }
  };

  return (
    <DashboardWrapper>
      <DashboardContainer>
        <DashboardSidebar userData={userData} />
        <DashboardMain userData={userData} />
      </DashboardContainer>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background-color: #f5f6fa;
  padding-top: 100px; /* Increased padding to create more space */
  position: relative;
  z-index: 1;
`;

const DashboardContainer = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  min-height: calc(100vh - 100px); /* Adjusted to match new padding */

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;
export default Dashboard;