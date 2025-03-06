import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCar, FaFileUpload, FaCheckCircle, FaClock } from 'react-icons/fa';
import { fetchWithAuth } from '../utils/api';
import { API_URL } from '../config';

const DashboardMain = ({ userData }) => {
  const [applications, setApplications] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  const progressSteps = [
    { id: 1, title: 'Registration', completed: true },
    { id: 2, title: 'Document Upload', completed: true },
    { id: 3, title: 'Verification', completed: false },
    { id: 4, title: 'Approval', completed: false }
  ];

  return (
    <MainContainer>
      <WelcomeSection>
        <h1>Welcome back, {userData?.name}</h1>
        <p>Track your vehicle registration progress</p>
      </WelcomeSection>

      <ProgressTracker>
        <h2>Application Progress</h2>
        <StepsContainer>
          {progressSteps.map((step, index) => (
            <Step key={step.id} completed={step.completed}>
              <StepNumber completed={step.completed}>
                {step.completed ? <FaCheckCircle /> : step.id}
              </StepNumber>
              <StepTitle>{step.title}</StepTitle>
              {index < progressSteps.length - 1 && <StepConnector completed={step.completed} />}
            </Step>
          ))}
        </StepsContainer>
      </ProgressTracker>

      <StatsGrid>
        <StatCard>
          <StatIcon><FaCar /></StatIcon>
          <StatInfo>
            <StatValue>2</StatValue>
            <StatLabel>Registered Vehicles</StatLabel>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon><FaFileUpload /></StatIcon>
          <StatInfo>
            <StatValue>5</StatValue>
            <StatLabel>Documents Uploaded</StatLabel>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon><FaClock /></StatIcon>
          <StatInfo>
            <StatValue>2</StatValue>
            <StatLabel>Pending Verifications</StatLabel>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <RecentActivity>
        <h2>Recent Activity</h2>
        <ActivityList>
          <ActivityItem>
            <ActivityIcon status="success"><FaCheckCircle /></ActivityIcon>
            <ActivityContent>
              <ActivityTitle>Document Verified</ActivityTitle>
              <ActivityTime>2 hours ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          {/* Add more activity items */}
        </ActivityList>
      </RecentActivity>
    </MainContainer>
  );
};

const MainContainer = styled.main`
  flex: 1;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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

const ProgressTracker = styled.div`
  margin-bottom: 30px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  position: relative;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.completed ? '#0066cc' : '#fff'};
  color: ${props => props.completed ? '#fff' : '#666'};
  border: 2px solid ${props => props.completed ? '#0066cc' : '#ddd'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const StepTitle = styled.span`
  font-size: 14px;
  color: #666;
`;

const StepConnector = styled.div`
  position: absolute;
  top: 15px;
  left: calc(50% + 20px);
  right: calc(-50% + 20px);
  height: 2px;
  background: ${props => props.completed ? '#0066cc' : '#ddd'};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const StatIcon = styled.div`
  font-size: 24px;
  color: #0066cc;
  margin-right: 15px;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const RecentActivity = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const ActivityList = styled.div`
  margin-top: 15px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.status === 'success' ? '#e6f4ea' : '#fff3e0'};
  color: ${props => props.status === 'success' ? '#1e8e3e' : '#f9ab00'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: #333;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

export default DashboardMain;