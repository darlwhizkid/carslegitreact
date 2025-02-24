import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaArrowUp, FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    setIsScrolling(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <AboutText>
            CarsLegit is Nigeria's leading vehicle registration and documentation platform. 
            We provide seamless solutions for all your vehicle-related documentation needs.
          </AboutText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink href="#home">Home</FooterLink>
            <FooterLink href="#about">About Us</FooterLink>
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
            <FooterLink href="#faq">FAQ</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Our Services</FooterTitle>
          <FooterLinks>
            <FooterLink href="#registration">Vehicle Registration</FooterLink>
            <FooterLink href="#renewal">Document Renewal</FooterLink>
            <FooterLink href="#transfer">Ownership Transfer</FooterLink>
            <FooterLink href="#documentation">Documentation Services</FooterLink>
            <FooterLink href="#license">Driver's License</FooterLink>
            <FooterLink href="#accessories">Vehicle Accessories</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact Info</FooterTitle>
          <ContactInfo>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>123 Business District, Lagos, Nigeria</span>
            </ContactItem>
            <ContactItem>
              <FaPhone />
              <span>+234 123 456 7890</span>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <span>info@carslegit.com</span>
            </ContactItem>
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © {new Date().getFullYear()} CarsLegit. All rights reserved.
        </Copyright>
        <SocialLinks>
          <SocialLink href="#"><FaFacebookF /></SocialLink>
          <SocialLink href="#"><FaTwitter /></SocialLink>
          <SocialLink href="#"><FaInstagram /></SocialLink>
          <SocialLink href="#"><FaLinkedinIn /></SocialLink>
        </SocialLinks>
      </FooterBottom>

      <ScrollButton 
        onClick={scrollToTop} 
        isVisible={isVisible}
      >
        {isScrolling ? <FaCar /> : <FaArrowUp />}
      </ScrollButton>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: #ffffff;
  padding: 80px 0 0;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 40px;
`;

const FooterTitle = styled.h3`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const AboutText = styled.p`
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled.a`
  color: #cccccc;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #0066cc;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #cccccc;

  svg {
    color: #0066cc;
    font-size: 18px;
  }
`;

const FooterBottom = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 40px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 20px;
  }
`;

const Copyright = styled.p`
  color: #cccccc;
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialLink = styled.a`
  color: #cccccc;
  font-size: 18px;
  transition: color 0.3s ease;

  &:hover {
    color: #0066cc;
  }
`;

const ScrollButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #0066cc;
  color: white;
  border: none;
  cursor: pointer;
  display: ${props => props.isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 999;

  svg {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #0052a3;
    
    svg {
      transform: translateY(-2px);
    }
  }
`;

export default Footer;
