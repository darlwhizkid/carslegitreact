import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import { API_URL } from '../../config';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    documentStats: {},
    vehicleRegistrations: [],
    stateDistribution: {}
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/admin/analytics/detailed`, {
      headers: { 'x-auth-token': token }
    });
    const data = await response.json();
    setAnalyticsData(data);
  };

  const generateReport = async (type) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/admin/reports/${type}`, {
      headers: { 'x-auth-token': token }
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-report.csv`;
    a.click();
  };

  return (
    <Container>
      <Header>
        <h2>Analytics Dashboard</h2>
        <ReportButtons>
          <ReportButton onClick={() => generateReport('users')}>
            Export Users Report
          </ReportButton>
          <ReportButton onClick={() => generateReport('documents')}>
            Export Documents Report
          </ReportButton>
        </ReportButtons>
      </Header>

      <GridContainer>
        <ChartCard>
          <h3>User Growth</h3>
          <Line data={analyticsData.userGrowth} />
        </ChartCard>

        <ChartCard>
          <h3>Document Verification Status</h3>
          <Bar data={analyticsData.documentStats} />
        </ChartCard>

        <StatsGrid>
          <StatCard>
            <StatTitle>Total Users</StatTitle>
            <StatValue>{analyticsData.totalUsers}</StatValue>
            <StatChange positive>+12% this month</StatChange>
          </StatCard>

          <StatCard>
            <StatTitle>Active Vehicles</StatTitle>
            <StatValue>{analyticsData.activeVehicles}</StatValue>
            <StatChange positive>+8% this month</StatChange>
          </StatCard>

          <StatCard>
            <StatTitle>Pending Verifications</StatTitle>
            <StatValue>{analyticsData.pendingVerifications}</StatValue>
            <StatChange>5 new today</StatChange>
          </StatCard>
        </StatsGrid>
      </GridContainer>
    </Container>
  );
};

// Styled components for the Analytics component
const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ReportButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ReportButton = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #1557b0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StatsGrid = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StatTitle = styled.h4`
  margin: 0;
  color: #666;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 10px 0;
`;

const StatChange = styled.div`
  color: ${props => props.positive ? '#1e8e3e' : '#666'};
  font-size: 14px;
`;

export default Analytics;
