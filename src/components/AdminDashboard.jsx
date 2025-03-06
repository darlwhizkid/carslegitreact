import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../config';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const [usersRes, analyticsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/users`, {
          headers: { 'x-auth-token': token }
        }),
        fetch(`${API_URL}/api/admin/analytics`, {
          headers: { 'x-auth-token': token }
        })
      ]);

      const usersData = await usersRes.json();
      const analyticsData = await analyticsRes.json();

      setUsers(usersData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarItem 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </SidebarItem>
        <SidebarItem 
          active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </SidebarItem>
        <SidebarItem 
          active={activeTab === 'vehicles'} 
          onClick={() => setActiveTab('vehicles')}
        >
          Vehicles
        </SidebarItem>
      </Sidebar>

      <MainContent>
        {activeTab === 'overview' && (
          <OverviewSection>
            <StatCard>
              <StatTitle>Total Users</StatTitle>
              <StatValue>{analytics.totalUsers || 0}</StatValue>
            </StatCard>
            <StatCard>
              <StatTitle>Total Vehicles</StatTitle>
              <StatValue>{analytics.totalVehicles || 0}</StatValue>
            </StatCard>
          </OverviewSection>
        )}

        {activeTab === 'users' && (
          <UsersTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <ActionButton>View Details</ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </UsersTable>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #1a1a1a;
  padding: 20px;
`;

const SidebarItem = styled.div`
  padding: 15px;
  color: ${props => props.active ? '#fff' : '#888'};
  background: ${props => props.active ? '#333' : 'transparent'};
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    color: #fff;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  background: #f5f5f5;
`;

const OverviewSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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

const UsersTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-collapse: collapse;

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f8f8;
    font-weight: 600;
  }
`;

const ActionButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0052a3;
  }
`;

export default AdminDashboard;
