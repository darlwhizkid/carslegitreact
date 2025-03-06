import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../config';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    pendingDocuments: 0,
    recentActivity: []
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/admin/analytics`, {
        headers: { 'x-auth-token': token }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  return (
    <AdminLayout>
      <DashboardContainer>
        <WelcomeSection>
          <h1>Welcome to Admin Dashboard</h1>
          <p>Here's what's happening today</p>
        </WelcomeSection>

        <StatsGrid>
          <StatCard>
            <StatTitle>Total Users</StatTitle>
            <StatValue>{stats.totalUsers}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Total Vehicles</StatTitle>
            <StatValue>{stats.totalVehicles}</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Pending Documents</StatTitle>
            <StatValue>{stats.pendingDocuments}</StatValue>
          </StatCard>
        </StatsGrid>

        <RecentActivity>
          <h2>Recent Activity</h2>
          <ActivityList>
            {stats.recentActivity.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityTime>{new Date(activity.timestamp).toLocaleString()}</ActivityTime>
                <ActivityText>{activity.description}</ActivityText>
              </ActivityItem>
            ))}
          </ActivityList>
        </RecentActivity>
      </DashboardContainer>
    </AdminLayout>
  );
};

const DashboardContainer = styled.div`
  padding: 20px;
`;

const WelcomeSection = styled.div`
  margin-bottom: 30px;
  
  h1 {
    margin: 0;
    color: #333;
  }
  
  p {
    color: #666;
    margin-top: 5px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StatTitle = styled.h3`
  margin: 0;
  color: #666;
  font-size: 16px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const RecentActivity = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ActivityList = styled.div`
  margin-top: 20px;
`;

const ActivityItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityTime = styled.div`
  font-size: 14px;
  color: #666;
`;

const ActivityText = styled.div`
  margin-top: 5px;
  color: #333;
`;

export default AdminDashboard;
