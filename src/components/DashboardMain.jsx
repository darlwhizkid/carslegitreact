import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCar, FaFile, FaClock, FaExclamationCircle, FaArrowUp, FaTruck } from 'react-icons/fa';
import NewVehicleModal from './NewVehicleModal';

const DashboardMain = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isCarIcon, setIsCarIcon] = useState(false);
  const [isNewVehicleModalOpen, setIsNewVehicleModalOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    setIsCarIcon(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsCarIcon(false), 1000);
  };

  return (
    <MainContent>
      <ContentHeader>
        <h1>Dashboard Overview</h1>
      </ContentHeader>

      <QuickActions>
        <ActionButton onClick={() => setIsNewVehicleModalOpen(true)}>
          <FaCar /> New Vehicle
        </ActionButton>
        <ActionButton>
          <FaFile /> New Application
        </ActionButton>
        <ActionButton>
          <FaClock /> Renewal Reminder
        </ActionButton>
      </QuickActions>

      <ContentGrid>
        <StatCard>
          <h3>Vehicles</h3>
          <p className="number">2</p>
        </StatCard>
        <StatCard>
          <h3>Applications</h3>
          <p className="number">0</p>
        </StatCard>
        <StatCard>
          <h3>Orders</h3>
          <p className="number">0</p>
        </StatCard>
        <StatCard>
          <h3>Products</h3>
          <p className="number">456</p>
        </StatCard>
      </ContentGrid>

      <DashboardSecondaryGrid>
        <DashboardColumn>
          <VehicleStatus>
            <h3>Your Vehicles</h3>
            <VehiclesContainer>
              <VehicleCard>
                <VehicleIcon>
                  <FaCar />
                </VehicleIcon>
                <VehicleInfo>
                  <h4>Toyota Camry 2020</h4>
                  <Status className="active">Registration Active</Status>
                  <p>Expires in 245 days</p>
                </VehicleInfo>
              </VehicleCard>
              <VehicleCard>
                <VehicleIcon>
                  <FaTruck />
                </VehicleIcon>
                <VehicleInfo>
                  <h4>Ford F-150 2022</h4>
                  <Status className="pending">Renewal Needed</Status>
                  <p>Expires in 15 days</p>
                </VehicleInfo>
              </VehicleCard>
            </VehiclesContainer>
          </VehicleStatus>

          <ActivitiesTimeline>
            <h3>Recent Activities</h3>
            <TimelineItem>
              <TimeStamp>2 hours ago</TimeStamp>
              <p>Vehicle registration completed for Toyota Camry</p>
            </TimelineItem>
            <TimelineItem>
              <TimeStamp>Yesterday</TimeStamp>
              <p>License renewal application submitted</p>
            </TimelineItem>
          </ActivitiesTimeline>
        </DashboardColumn>

        <DashboardColumn>
          <RenewalAlerts>
            <h3>Upcoming Renewals</h3>
            <AlertItem urgent>
              <FaExclamationCircle />
              <span>Driver's License expires in 30 days</span>
              <RenewButton>Renew Now</RenewButton>
            </AlertItem>
          </RenewalAlerts>
        </DashboardColumn>
      </DashboardSecondaryGrid>

      <ScrollToTop show={showScrollButton} onClick={handleScrollTop}>
        {isCarIcon ? <FaCar /> : <FaArrowUp />}
      </ScrollToTop>

      <NewVehicleModal 
        isOpen={isNewVehicleModalOpen} 
        onClose={() => setIsNewVehicleModalOpen(false)} 
      />
    </MainContent>
  );
};

const MainContent = styled.main`
  flex: 1;
  padding: 30px;
`;

const ContentHeader = styled.div`
  margin-bottom: 30px;
  
  h1 {
    color: #333;
    font-size: 1.8rem;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #333;

  &:hover {
    background: #007bff;
    color: #fff;
    border-color: #007bff;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #666;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .number {
    color: #333;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const DashboardSecondaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const VehicleStatus = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const VehiclesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
`;

const VehicleCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const VehicleIcon = styled.div`
  font-size: 2rem;
  color: #007bff;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 50%;
`;

const VehicleInfo = styled.div`
  h4 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Status = styled.p`
  font-weight: 500;
  
  &.active {
    color: #28a745;
  }
  
  &.pending {
    color: #ffc107;
  }
`;

const ActivitiesTimeline = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const TimelineItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const TimeStamp = styled.span`
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const RenewalAlerts = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  background: ${props => props.urgent ? '#fff3f3' : '#fff'};
  border: ${props => props.urgent ? '1px solid #ffcdd2' : '1px solid #eee'};

  svg {
    color: #dc3545;
    font-size: 1.2rem;
  }
`;

const RenewButton = styled.button`
  margin-left: auto;
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #c82333;
  }
`;

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
  }
`;

export default DashboardMain;
