import React from 'react';
import styled, { keyframes } from 'styled-components';

const Partners = () => {
  const partners = [
    { name: 'FRSC', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=FRSC' },
    { name: 'FIRS', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=FIRS' },
    { name: 'SON', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=SON' },
    { name: 'Nigeria Police', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=Nigeria+Police' },
    { name: 'Ministry of Transport', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=MOT' },
    { name: 'Nigerian Ports Authority', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=NPA' },
    // Duplicate logos for seamless loop
    { name: 'FRSC', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=FRSC' },
    { name: 'FIRS', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=FIRS' },
    { name: 'SON', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=SON' },
    { name: 'Nigeria Police', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=Nigeria+Police' },
    { name: 'Ministry of Transport', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=MOT' },
    { name: 'Nigerian Ports Authority', logo: 'https://placehold.co/200x100/e0e0e0/666666?text=NPA' },
  ];

  return (
    <PartnersSection>
      <PartnersContainer>
        <SectionTitle>Partner Brands/Agencies</SectionTitle>
        <LogoScroller>
          <LogoTrack>
            {partners.map((partner, index) => (
              <LogoItem key={index}>
                <Logo src={partner.logo} alt={partner.name} />
              </LogoItem>
            ))}
          </LogoTrack>
        </LogoScroller>
      </PartnersContainer>
    </PartnersSection>
  );
};

const scrollX = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const PartnersSection = styled.section`
  padding: 60px 0;
  background: #ffffff;
  overflow: hidden;
`;

const PartnersContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const LogoScroller = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #fff, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #fff, transparent);
  }
`;

const LogoTrack = styled.div`
  display: flex;
  animation: ${scrollX} 30s linear infinite;
  width: fit-content;

  &:hover {
    animation-play-state: paused;
  }
`;

const LogoItem = styled.div`
  flex: 0 0 auto;
  padding: 0 30px;
`;

const Logo = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  object-fit: contain;
  padding: 15px;
  background: #f8f8f8;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0);
    opacity: 1;
    background: #f0f0f0;
  }
`;

export default Partners;
