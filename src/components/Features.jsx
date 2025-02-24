import React from "react";
import styled from "styled-components";
import {
  FaCar,
  FaSync,
  FaExchangeAlt,
  FaFileAlt,
  FaIdCard,
  FaCogs,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaCar />,
      title: "Vehicle Registration",
      description:
        "Quick and efficient processing of your vehicle registration documents",
    },
    {
      icon: <FaSync />,
      title: "Document Renewal",
      description: "Hassle-free renewal of all your vehicle-related documents",
    },
    {
      icon: <FaExchangeAlt />,
      title: "Ownership Transfer",
      description: "Smooth and secure transfer of vehicle ownership",
    },
    {
      icon: <FaFileAlt />,
      title: "Documentation Services",
      description:
        "Comprehensive assistance with all vehicle documentation needs",
    },
    {
      icon: <FaIdCard />,
      title: "Driver's Licence",
      description:
        "Professional support for driver's licence applications and renewals",
    },
    {
      icon: <FaCogs />,
      title: "Vehicle Accessories",
      description: "Quality accessories and parts for your vehicle needs",
    },
  ];

  return (
    <FeaturesSection>
      <FeaturesContainer>
        <SectionTitle>What We Offer</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <IconContainer>{feature.icon}</IconContainer>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesContainer>
    </FeaturesSection>
  );
};

const FeaturesSection = styled.section`
  padding: 80px 0;
  background: #ffffff;
`;

const FeaturesContainer = styled.div`
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
  margin-bottom: 50px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeatureCard = styled.div`
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(0, 102, 204, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    font-size: 24px;
    color: #0066cc;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

export default Features;
