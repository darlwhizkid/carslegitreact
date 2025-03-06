import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaFileAlt, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { fetchWithAuth } from '../utils/api';
import { API_URL } from '../config';

const DashboardSidebar = ({ userData }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}/api/notifications`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }
      
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <SidebarContainer>
      <UserSection>
        <UserAvatar>
          {userData?.name?.charAt(0).toUpperCase()}
        </UserAvatar>
        <UserName>{userData?.name}</UserName>
        <UserEmail>{userData?.email}</UserEmail>
      </UserSection>

      <NavSection>
        <NavItem to="/dashboard">
          <FaCar /> Vehicles
        </NavItem>
        <NavItem to="/dashboard/documents">
          <FaFileAlt /> Documents
        </NavItem>
        <NavItem to="/dashboard/notifications">
          <FaBell /> 
          Notifications
          {notifications.length > 0 && (
            <NotificationBadge>{notifications.length}</NotificationBadge>
          )}
        </NavItem>
        <NavItem to="/dashboard/settings">
          <FaCog /> Settings
        </NavItem>
      </NavSection>

      <LogoutButton onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </LogoutButton>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 250px;
  background: white;
  border-right: 1px solid #eee;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const UserSection = styled.div`
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #0066cc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto 10px;
`;

const UserName = styled.h3`
  margin: 0;
  color: #333;
`;

const UserEmail = styled.p`
  margin: 5px 0 0;
  color: #666;
  font-size: 14px;
`;

const NavSection = styled.div`
  margin-top: 20px;
  flex: 1;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px;
  color: #333;
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 5px;
  position: relative;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: #f5f6fa;
  }

  &.active {
    background: #f5f6fa;
    color: #0066cc;
  }
`;

const NotificationBadge = styled.span`
  background: #ff4444;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  position: absolute;
  right: 10px;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
  font-size: 16px;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: #f5f6fa;
    color: #d93025;
  }
`;

export default DashboardSidebar;