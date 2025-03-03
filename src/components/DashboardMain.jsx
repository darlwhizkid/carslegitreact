import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCar, FaFile, FaClock, FaExclamationCircle, FaArrowUp, FaTruck, FaSearch, FaFilter } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import NewVehicleModal from './NewVehicleModal';

const vehicleData = [
  { name: 'Jan', vehicles: 4 },
  { name: 'Feb', vehicles: 3 },
  { name: 'Mar', vehicles: 5 },
  { name: 'Apr', vehicles: 6 },
  { name: 'May', vehicles: 4 },
  { name: 'Jun', vehicles: 7 }
];

const pieData = [
  { name: 'Cars', value: 60 },
  { name: 'Trucks', value: 25 },
  { name: 'Motorcycles', value: 15 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];


const DashboardMain = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isCarIcon, setIsCarIcon] = useState(false);
  const [isNewVehicleModalOpen, setIsNewVehicleModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
        <HeaderTop>
          <h1>Dashboard Overview</h1>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
          </SearchContainer>
        </HeaderTop>
        <FilterContainer>
          <FilterButton 
            active={selectedFilter === 'all'} 
            onClick={() => setSelectedFilter('all')}
          >
            All Vehicles
          </FilterButton>
          <FilterButton 
            active={selectedFilter === 'active'} 
            onClick={() => setSelectedFilter('active')}
          >
            Active
          </FilterButton>
          <FilterButton 
            active={selectedFilter === 'pending'} 
            onClick={() => setSelectedFilter('pending')}
          >
            Pending Renewal
          </FilterButton>
          <FilterButton 
            active={selectedFilter === 'expired'} 
            onClick={() => setSelectedFilter('expired')}
          >
            Expired
          </FilterButton>
        </FilterContainer>
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
          <StatIcon className="vehicles">
            <FaCar />
          </StatIcon>
          <StatInfo>
            <h3>Total Vehicles</h3>
            <p className="number">2</p>
            <StatTrend positive>
              +12.5% from last month
            </StatTrend>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon className="applications">
            <FaFile />
          </StatIcon>
          <StatInfo>
            <h3>Applications</h3>
            <p className="number">0</p>
            <StatTrend>
              No change
            </StatTrend>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon className="orders">
            <FaClock />
          </StatIcon>
          <StatInfo>
            <h3>Pending Orders</h3>
            <p className="number">0</p>
            <StatTrend>
              No change
            </StatTrend>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon className="products">
            <FaFilter />
          </StatIcon>
          <StatInfo>
            <h3>Available Products</h3>
            <p className="number">456</p>
            <StatTrend positive>
              +25% from last month
            </StatTrend>
          </StatInfo>
        </StatCard>
      </ContentGrid>

      <ChartSection>
        <ChartGrid>
          <ChartCard>
            <h3>Vehicle Registration Trends</h3>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={vehicleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="vehicles" 
                    stroke="#007bff" 
                    fill="#007bff" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCard>
          <ChartCard>
            <h3>Vehicle Type Distribution</h3>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <ChartLegend>
                {pieData.map((entry, index) => (
                  <LegendItem key={entry.name}>
                    <LegendColor color={COLORS[index]} />
                    <span>{entry.name}</span>
                  </LegendItem>
                ))}
              </ChartLegend>
            </ChartContainer>
          </ChartCard>
        </ChartGrid>
      </ChartSection>

      <DashboardSecondaryGrid>
        <DashboardColumn>
          <VehicleStatus>
            <SectionHeader>
              <h3>Your Vehicles</h3>
              <ViewAllButton>View All</ViewAllButton>
            </SectionHeader>
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
                <VehicleActions>
                  <ActionDot />
                  <ActionDot />
                  <ActionDot />
                </VehicleActions>
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
                <VehicleActions>
                  <ActionDot />
                  <ActionDot />
                  <ActionDot />
                </VehicleActions>
              </VehicleCard>
            </VehiclesContainer>
          </VehicleStatus>

          <ActivitiesTimeline>
            <SectionHeader>
              <h3>Recent Activities</h3>
              <ViewAllButton>View All</ViewAllButton>
            </SectionHeader>
            <TimelineContainer>
              <TimelineItem>
                <TimelineDot />
                <TimelineContent>
                  <TimeStamp>2 hours ago</TimeStamp>
                  <p>Vehicle registration completed for Toyota Camry</p>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineDot />
                <TimelineContent>
                  <TimeStamp>Yesterday</TimeStamp>
                  <p>License renewal application submitted</p>
                </TimelineContent>
              </TimelineItem>
            </TimelineContainer>
          </ActivitiesTimeline>
        </DashboardColumn>

        <DashboardColumn>
          <RenewalAlerts>
            <SectionHeader>
              <h3>Upcoming Renewals</h3>
              <ViewAllButton>View All</ViewAllButton>
            </SectionHeader>
            <AlertItem urgent>
              <AlertIcon>
                <FaExclamationCircle />
              </AlertIcon>
              <AlertContent>
                <AlertTitle>Driver's License Renewal</AlertTitle>
                <AlertInfo>Expires in 30 days</AlertInfo>
              </AlertContent>
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
  background: #f8f9fa;
`;

const ContentHeader = styled.div`
  margin-bottom: 30px;
  
  h1 {
    color: #333;
    font-size: 1.8rem;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    color: #333;
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.active ? '#007bff' : '#ddd'};
  border-radius: 20px;
  background: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    color: ${props => props.active ? 'white' : '#007bff'};
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
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  &.vehicles {
    background: rgba(0, 123, 255, 0.1);
    color: #007bff;
  }

  &.applications {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  }

  &.orders {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
  }

  &.products {
    background: rgba(111, 66, 193, 0.1);
    color: #6f42c1;
  }
`;

const StatInfo = styled.div`
  flex: 1;

  h3 {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .number {
    color: #333;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const StatTrend = styled.p`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#28a745' : '#666'};
`;

const ChartSection = styled.div`
  margin: 2rem 0;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  h3 {
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${props => props.color};
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    color: #333;
  }
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const VehicleStatus = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
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
  flex: 1;

  h4 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const VehicleActions = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionDot = styled.div`
  width: 4px;
  height: 4px;
  background: #666;
  border-radius: 50%;
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
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 20px;
`;

const TimelineItem = styled.div`
  position: relative;
  padding: 1rem 0;
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -20px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #007bff;
  border: 2px solid white;
`;

const TimelineContent = styled.div`
  margin-left: 10px;
`;

const TimeStamp = styled.span`
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const RenewalAlerts = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.urgent ? '#fff3f3' : '#fff'};
  border: ${props => props.urgent ? '1px solid #ffcdd2' : '1px solid #eee'};
`;

const AlertIcon = styled.div`
  color: #dc3545;
  font-size: 1.2rem;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h4`
  color: #333;
  margin-bottom: 0.3rem;
`;

const AlertInfo = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const RenewButton = styled.button`
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

