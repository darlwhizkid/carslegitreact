import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h3>Dashboard Menu</h3>
      </SidebarHeader>
      <SidebarMenu>
        <MenuItem>
          <MenuLink to="#" className="active">Overview</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="#">Add Vehicle</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="#">Reports</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="#">Settings</MenuLink>
        </MenuItem>
      </SidebarMenu>
    </Sidebar>
  );
};

const Sidebar = styled.aside`
  width: 250px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
`;

const SidebarHeader = styled.div`
  padding: 0 20px 20px;
  border-bottom: 1px solid #eee;
  
  h3 {
    color: #333;
    font-size: 1.2rem;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li``;

const MenuLink = styled(Link)`
  display: block;
  padding: 15px 20px;
  color: #555;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover,
  &.active {
    background-color: #f8f9fa;
    color: #007bff;
    border-left: 4px solid #007bff;
  }
`;

export default DashboardSidebar;
