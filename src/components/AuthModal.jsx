import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaTimes, FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    const validCredentials = {
      email: 'demo@carslegit.com',
      password: 'demo123'
    };

    if (loginData.email === validCredentials.email && 
        loginData.password === validCredentials.password) {
      localStorage.setItem('isAuthenticated', 'true');
      onClose();
      navigate('/dashboard');
    } else {
      alert('Invalid credentials! Use demo@carslegit.com / demo123');
    }
  };

  const ForgotPasswordForm = () => (
    <Form>
      <FormTitle>Reset Password</FormTitle>
      <FormText>Enter your email address to receive password reset instructions.</FormText>
      <InputGroup>
        <InputIcon>
          <FaEnvelope />
        </InputIcon>
        <Input type="email" placeholder="Email Address" />
      </InputGroup>
      <SubmitButton>Send Reset Link</SubmitButton>
      <BackToLogin onClick={() => setShowForgotPassword(false)}>
        Back to Login
      </BackToLogin>
    </Form>
  );

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>

        {!showForgotPassword && (
          <TabContainer>
            <Tab 
              active={activeTab === 'login'} 
              onClick={() => setActiveTab('login')}
            >
              Login
            </Tab>
            <Tab 
              active={activeTab === 'register'} 
              onClick={() => setActiveTab('register')}
            >
              Register
            </Tab>
          </TabContainer>
        )}

        {showForgotPassword ? (
          <ForgotPasswordForm />
        ) : activeTab === 'login' ? (
          <Form onSubmit={handleLogin}>
            <InputGroup>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input 
                type="email" 
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input 
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
              <PasswordToggle 
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>
            <RememberForgot>
              <label>
                <Checkbox type="checkbox" />
                Remember me
              </label>
              <ForgotPassword onClick={() => setShowForgotPassword(true)}>
                Forgot Password?
              </ForgotPassword>
            </RememberForgot>
            <SubmitButton type="submit">Login</SubmitButton>
            <Divider>
              <span>or login with</span>
            </Divider>
            <SocialButtons>
              <SocialButton google>
                <FaGoogle /> Google
              </SocialButton>
              <SocialButton facebook>
                <FaFacebookF /> Facebook
              </SocialButton>
            </SocialButtons>
          </Form>
        ) : (
          <Form>
            <InputGroup>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input type="text" placeholder="Full Name" />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input type="email" placeholder="Email Address" />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <FaPhone />
              </InputIcon>
              <Input type="tel" placeholder="Phone Number" />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input 
                type={showRegisterPassword ? "text" : "password"}
                placeholder="Password"
              />
              <PasswordToggle 
                type="button"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              >
                {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <PasswordToggle 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>
            <SubmitButton>Register</SubmitButton>
          </Form>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 20px;
    margin: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
`;

const Tab = styled.button`
  flex: 1;
  padding: 15px;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.active ? '#0066cc' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#0066cc' : 'transparent'};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #0066cc;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormTitle = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const FormText = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 45px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  padding: 0;
  
  &:hover {
    color: #333;
  }
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const ForgotPassword = styled.button`
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BackToLogin = styled.button`
  background: none;
  border: none;
  color: #0066cc;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 0;
  text-align: center;
  width: 100%;
  margin-top: 10px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  background: #0066cc;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0052a3;
  }
`;

const Divider = styled.div`
  text-align: center;
  position: relative;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #ddd;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  span {
    background: white;
    padding: 0 10px;
    color: #666;
    font-size: 14px;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.3s ease;
  color: white;
  background: ${props => props.google ? '#DB4437' : props.facebook ? '#4267B2' : '#666'};

  &:hover {
    opacity: 0.9;
  }
`;

export default AuthModal;
