import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Smith",
      location: "Lagos, Nigeria",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      text: "The vehicle registration process was incredibly smooth. The team guided me through every step, making what seemed complex very simple.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      location: "Port Harcourt, Nigeria",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "Outstanding service! They handled my documentation with utmost professionalism. I highly recommend their services to anyone looking to register their vehicle.",
      rating: 5
    },
    {
      name: "Michael Brown",
      location: "Abuja, Nigeria",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "Excellent customer service and quick turnaround time. The entire process was transparent and hassle-free. Will definitely use their services again.",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <FaStar key={index} />
    ));
  };

  return (
    <TestimonialsSection>
      <TestimonialsContainer>
        <SectionTitle>What Our Clients Say</SectionTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <ClientInfo>
                <ClientImage src={testimonial.image} alt={testimonial.name} />
                <ClientDetails>
                  <ClientName>{testimonial.name}</ClientName>
                  <ClientLocation>{testimonial.location}</ClientLocation>
                </ClientDetails>
              </ClientInfo>
              <StarRating>
                {renderStars(testimonial.rating)}
              </StarRating>
              <TestimonialText>{testimonial.text}</TestimonialText>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsContainer>
    </TestimonialsSection>
  );
};

const TestimonialsSection = styled.section`
  padding: 80px 0;
  background: #ffffff;
`;

const TestimonialsContainer = styled.div`
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

const TestimonialsGrid = styled.div`
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

const TestimonialCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ClientImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const ClientLocation = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
`;

const StarRating = styled.div`
  color: #ffc107;
  margin-bottom: 15px;
  
  svg {
    margin-right: 5px;
  }
`;

const TestimonialText = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

export default Testimonials;
