import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaChartBar, FaUsers, FaFileAlt, FaBell, FaCog } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2>Admin Panel</h2>
      </SidebarHeader>
      
      <NavItems>
        <NavItem to="/admin/dashboard">
          <FaChartBar /> Dashboard
        </NavItem>
        <NavItem to="/admin/users">
          <FaUsers /> Users
        </NavItem>
        <NavItem to="/admin/documents">
          <FaFileAlt /> Documents
        </NavItem>
        <NavItem to="/admin/notifications">
          <FaBell /> Notifications
        </NavItem>
        <NavItem to="/admin/settings">
          <FaCog /> Settings
        </NavItem>
      </NavItems>
    </Sidebar>
  );
};

const Sidebar = styled.div`
  width: 250px;
  background: #1a1a1a;
  color: white;
  padding: 20px 0;
  min-height: 100%;
`;

const SidebarHeader = styled.div`
  padding: 0 20px 20px;
  border-bottom: 1px solid #333;
  
  h2 {
    margin: 0;
    font-size: 24px;
  }
`;

const NavItems = styled.div`
  padding: 20px 0;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  color: #888;
  text-decoration: none;
  transition: all 0.3s ease;

  svg {
    font-size: 20px;
  }

  &:hover {
    color: white;
    background: #333;
  }

  &.active {
    color: white;
    background: #333;
    border-left: 4px solid #0066cc;
  }
`;

export default AdminSidebar;
