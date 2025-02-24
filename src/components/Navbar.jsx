import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  const DateDisplay = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return (
      <DateContainer>
        <DayNumber>{day}</DayNumber>
        <MonthYear>
          <Month>{month}</Month>
          <Year>{year}</Year>
        </MonthYear>
      </DateContainer>
    );
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavContainer>
        <LeftSection>
          <DateDisplay />
          <LogoSection>
            <LogoContainer>
              <Logo src={logo} alt="Cars Legit" />
            </LogoContainer>
            <BrandTitle>CarsLegit</BrandTitle>
          </LogoSection>
        </LeftSection>
          <DesktopMenu>
            <NavLinks>
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about" onClick={(e) => {
                e.preventDefault()
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
              }}>About Us</NavLink>
              <NavLink href="#faq" onClick={(e) => {
                e.preventDefault()
                document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })
              }}>FAQ</NavLink>
            <DropdownContainer
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <NavLink href="#services">
                Our Services <FaCaretDown style={{ marginLeft: "5px" }} />
              </NavLink>
              {showDropdown && (
                <DropdownMenu>
                  <DropdownItem href="#registration">
                    Vehicle Registration
                  </DropdownItem>
                  <DropdownItem href="#renewal">Document Renewal</DropdownItem>
                  <DropdownItem href="#transfer">
                    Ownership Transfer
                  </DropdownItem>
                  <DropdownItem href="#documentation">
                    Documentation Services
                  </DropdownItem>
                  <DropdownItem href="#license">Driver's Licence</DropdownItem>
                  <DropdownItem href="#accessories">
                    Vehicle Accessories
                  </DropdownItem>
                </DropdownMenu>
              )}
            </DropdownContainer>
            <NavLink href="#track">Track Application</NavLink>
          </NavLinks>
          <LoginButton>Login/Register</LoginButton>
        </DesktopMenu>

        <MenuButton onClick={toggleMenu} isOpen={isOpen}>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
        <MobileMenu isOpen={isOpen}>
          <MobileNavLinks>
            <MobileNavLink href="#home">Home</MobileNavLink>
            <MobileNavLink href="#about">About Us</MobileNavLink>
            <MobileDropdownContainer>
              <MobileNavLink
                as="div"
                onClick={() => setShowMobileDropdown(!showMobileDropdown)}
              >
                Our Services{" "}
                <FaCaretDown
                  style={{
                    marginLeft: "5px",
                    transform: showMobileDropdown
                      ? "rotate(180deg)"
                      : "rotate(0)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </MobileNavLink>
              {showMobileDropdown && (
                <MobileDropdownMenu>
                  <MobileDropdownItem href="#registration">
                    Vehicle Registration
                  </MobileDropdownItem>
                  <MobileDropdownItem href="#renewal">
                    Document Renewal
                  </MobileDropdownItem>
                  <MobileDropdownItem href="#transfer">
                    Ownership Transfer
                  </MobileDropdownItem>
                  <MobileDropdownItem href="#documentation">
                    Documentation Services
                  </MobileDropdownItem>
                  <MobileDropdownItem href="#license">
                    Driver's Licence
                  </MobileDropdownItem>
                  <MobileDropdownItem href="#accessories">
                    Vehicle Accessories
                  </MobileDropdownItem>
                </MobileDropdownMenu>
              )}
            </MobileDropdownContainer>
            <MobileNavLink href="#track">Track Application</MobileNavLink>
            <MobileNavLink href="#faq">FAQ</MobileNavLink>
            <MobileLoginButton>Login/Register</MobileLoginButton>
          </MobileNavLinks>
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BrandTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
  font-family: "Poppins", sans-serif;
`;

const DayNumber = styled.span`
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
  color: #333;
  margin-top: 8px;
`;

const MonthYear = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 0.9;
`;

const Month = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #555;
`;

const Year = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #555;
`;

const LogoContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 35px;
  margin-right: 40px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #0066cc;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 200px;
  margin-top: 5px;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #f5f5f5;
    color: #0066cc;
  }
`;

const LoginButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #0052a3;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.div`
  display: none;
  width: 30px;
  height: 25px;
  position: relative;
  cursor: pointer;
  z-index: 1100;

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #333;
    border-radius: 3px;
    transition: all 0.3s ease;

    &:first-child {
      top: ${({ isOpen }) => (isOpen ? "50%" : "0")};
      transform: ${({ isOpen }) => (isOpen ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
    }

    &:last-child {
      bottom: ${({ isOpen }) => (isOpen ? "50%" : "0")};
      transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 80%;
  height: 100vh;
  background: white;
  padding: 100px 20px 60px;
  transition: right 0.3s ease;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MobileNavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: 500;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileDropdownContainer = styled.div`
  width: 100%;
`;

const MobileDropdownMenu = styled.div`
  background: #f8f8f8;
  border-radius: 8px;
  margin-top: 5px;
  overflow: hidden;
`;

const MobileDropdownItem = styled.a`
  display: block;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f0f0f0;
    color: #0066cc;
  }
`;

const MobileLoginButton = styled(LoginButton)`
  width: 100%;
  margin-top: 20px;
`;

export default Navbar;
