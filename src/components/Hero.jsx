import React from "react";
import styled from "styled-components";

const HeroSection = styled.section`
  padding: 120px 0 80px;
  background: #ffffff;
  text-align: left;

  @media (max-width: 768px) {
    padding: 100px 0 40px;
  }
`;

const HeroContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 20px;
    gap: 40px;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  line-height: 1.2;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 16px;
  }
`;

const HeroText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.6;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const CallToAction = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #0052a3;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 24px;
    font-size: 16px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const HeroImage = styled.img`
  width: 600px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  background-color: #e0e0e0;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const Hero = () => {
  return (
    <HeroSection id="about">
      <HeroContainer>
        <ContentSection>
          <HeroTitle>Simplify Your Car Documentation Journey</HeroTitle>
          <HeroText>
            Your one-stop platform for managing vehicle papers, registrations,
            and renewals. Experience hassle-free car documentation like never
            before.
          </HeroText>
          <CallToAction>Get Started</CallToAction>
        </ContentSection>
        <ImageSection>
          <HeroImage src="https://placehold.co/600x400" alt="Vehicle Import" />
        </ImageSection>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
