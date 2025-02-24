import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
  const faqItems = [
    {
      question: "What documents do I need to register my vehicle?",
      answer: "To register your vehicle, you'll need: Original logbook, National ID/Passport, KRA PIN certificate, Import documentation (for imported vehicles), and proof of ownership."
    },
    {
      question: "How long does the registration process take?",
      answer: "The standard vehicle registration process typically takes 3-5 working days, provided all required documentation is complete and accurate."
    },
    {
      question: "What are the costs involved in vehicle registration?",
      answer: "Registration costs vary depending on vehicle type, age, and engine capacity. Our team will provide a detailed breakdown of all applicable fees and charges."
    },
    {
      question: "Can you help with vehicle inspection?",
      answer: "Yes, we assist with scheduling and coordinating vehicle inspections at authorized inspection centers, ensuring your vehicle meets all regulatory requirements."
    },
    {
      question: "Do you handle registration for all types of vehicles?",
      answer: "Yes, we handle registration for all vehicle types including private cars, commercial vehicles, motorcycles, and heavy machinery."
    },
    {
      question: "What happens if my registration is rejected?",
      answer: "If your registration is rejected, our team will help identify the issues, make necessary corrections, and resubmit the application at no additional cost."
    }
  ];

  const [openItems, setOpenItems] = useState(new Array(faqItems.length).fill(false));

  const toggleItem = (index) => {
    setOpenItems(openItems.map((item, i) => i === index ? !item : false));
  };

  return (
    <FAQSection id="faq">
      <FAQContainer>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQGrid>
          {faqItems.map((item, index) => (
            <FAQItem key={index}>
              <QuestionButton onClick={() => toggleItem(index)} isOpen={openItems[index]}>
                <QuestionText>{item.question}</QuestionText>
                {openItems[index] ? <FaMinus /> : <FaPlus />}
              </QuestionButton>
              <AnswerContainer isOpen={openItems[index]}>
                <AnswerText>{item.answer}</AnswerText>
              </AnswerContainer>
            </FAQItem>
          ))}
        </FAQGrid>
      </FAQContainer>
    </FAQSection>
  );
};
const FAQSection = styled.section`
  padding: 80px 0;
  background: #ffffff;
`;

const FAQContainer = styled.div`
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

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FAQItem = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const QuestionButton = styled.button`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.isOpen ? '#f8f8f8' : '#ffffff'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f8f8;
  }

  svg {
    font-size: 16px;
    color: #0066cc;
    transition: transform 0.3s ease;
  }
`;

const QuestionText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: left;
  padding-right: 20px;
`;

const AnswerContainer = styled.div`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const AnswerText = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  padding: 0 20px 20px;
  margin: 0;
`;

export default FAQ;
