import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaTimes, FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaMapMarkerAlt } from 'react-icons/fa';
import { API_URL } from '../config';

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const REFERRAL_SOURCES = [
  'Google Search',
  'Social Media',
  'Friend/Family',
  'Advertisement',
  'Blog/Article',
  'Other'
];

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    referralSource: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^(\+234|0)[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid Nigerian phone number';
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters with numbers and special characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.state) errors.state = 'Please select your state';
    if (!formData.referralSource) errors.referralSource = 'Please select how you heard about us';
    if (!formData.agreeToTerms) errors.terms = 'Please agree to the terms and conditions';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === 'register') {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors);
        return;
      }
    }
    setFieldErrors({});

    try {
      const response = activeTab === 'login'
        ? await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
        : await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      onClose();
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {showForgotPassword ? (
          <ForgotPasswordForm />
        ) : activeTab === 'login' ? (
          <Form onSubmit={handleSubmit}>
            <InputGroup error={fieldErrors.email}>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input 
                type="email" 
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {fieldErrors.email && <InputError>{fieldErrors.email}</InputError>}
            </InputGroup>
            <InputGroup error={fieldErrors.password}>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input 
                type={showLoginPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordToggle 
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
              {fieldErrors.password && <InputError>{fieldErrors.password}</InputError>}
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
          <Form onSubmit={handleSubmit}>
            <InputGroup error={fieldErrors.name}>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input 
                type="text" 
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {fieldErrors.name && <InputError>{fieldErrors.name}</InputError>}
            </InputGroup>
            <InputGroup error={fieldErrors.email}>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input 
                type="email" 
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {fieldErrors.email && <InputError>{fieldErrors.email}</InputError>}
            </InputGroup>
            <InputGroup error={fieldErrors.password}>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input 
                type={showRegisterPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordToggle 
                type="button"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              >
                {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
              {fieldErrors.password && <InputError>{fieldErrors.password}</InputError>}
            </InputGroup>
            <InputGroup error={fieldErrors.confirmPassword}>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input 
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <PasswordToggle 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
              {fieldErrors.confirmPassword && <InputError>{fieldErrors.confirmPassword}</InputError>}
            </InputGroup>
            <InputGroup error={fieldErrors.phone}>
              <InputIcon>
                <FaPhone />
              </InputIcon>
              <Input 
                type="tel" 
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {fieldErrors.phone && <InputError>{fieldErrors.phone}</InputError>}
            </InputGroup>
            <InputGroup error={fieldErrors.state}>
              <InputIcon>
                <FaMapMarkerAlt />
              </InputIcon>
              <Select 
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {NIGERIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </Select>
              {fieldErrors.state && <InputError>{fieldErrors.state}</InputError>}
            </InputGroup>
            <InputGroup error={fieldErrors.referralSource}>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Select 
                name="referralSource"
                value={formData.referralSource}
                onChange={handleChange}
                required
              >
                <option value="">How did you hear about us?</option>
                {REFERRAL_SOURCES.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </Select>
              {fieldErrors.referralSource && <InputError>{fieldErrors.referralSource}</InputError>}
            </InputGroup>
            <TermsCheckbox>
              <Checkbox 
                type="checkbox" 
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                required
              />
              <span>I agree to the Terms and Conditions</span>
              {fieldErrors.terms && <InputError>{fieldErrors.terms}</InputError>}
            </TermsCheckbox>
            <SubmitButton 
              type="submit" 
              disabled={!formData.agreeToTerms}
            >
              Register
            </SubmitButton>
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
  max-height: 90vh;
  overflow-y: auto;
  margin: 20px;

  @media (max-width: 600px) {
    padding: 20px;
    margin: 10px;
    max-height: 85vh;
  }

  /* Add smooth scrolling */
  scroll-behavior: smooth;
  
  /* Style the scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
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
  margin-bottom: 20px;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 45px;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 45px;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;
  appearance: none;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
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
  font-size: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const BackToLogin = styled.button`
  background: none;
  border: none;
  color: #0066cc;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
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

  &:hover {
    background: #0052a3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
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

  &::before { left: 0; }
  &::after { right: 0; }

  span {
    background: white;
    padding: 0 10px;
    color: #666;
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
  color: white;
  background: ${props => props.google ? '#DB4437' : '#4267B2'};

  &:hover {
    opacity: 0.9;
  }
`;

const TermsCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background: #ffe6e6;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputError = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  position: absolute;
  bottom: -20px;
  left: 0;
`;

export default AuthModal;
