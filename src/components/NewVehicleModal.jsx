import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCar, FaTruck, FaMotorcycle, FaTimes, FaUpload } from 'react-icons/fa';

const NewVehicleModal = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('car');
  const [uploadedFiles, setUploadedFiles] = useState({
    ownership: null,
    insurance: null
  });

  const handleFileUpload = (type, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>Add New Vehicle</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <VehicleTypeSelector>
          <TypeOption 
            active={selectedType === 'car'} 
            onClick={() => setSelectedType('car')}
          >
            <FaCar />
            <span>Car</span>
          </TypeOption>
          <TypeOption 
            active={selectedType === 'truck'} 
            onClick={() => setSelectedType('truck')}
          >
            <FaTruck />
            <span>Truck</span>
          </TypeOption>
          <TypeOption 
            active={selectedType === 'motorcycle'} 
            onClick={() => setSelectedType('motorcycle')}
          >
            <FaMotorcycle />
            <span>Motorcycle</span>
          </TypeOption>
        </VehicleTypeSelector>

        <Form>
          <FormGrid>
            <FormGroup>
              <Label>Vehicle Make</Label>
              <Input type="text" placeholder="e.g., Toyota" />
            </FormGroup>
            <FormGroup>
              <Label>Vehicle Model</Label>
              <Input type="text" placeholder="e.g., Camry" />
            </FormGroup>
            <FormGroup>
              <Label>Year</Label>
              <Input type="number" placeholder="e.g., 2023" />
            </FormGroup>
            <FormGroup>
              <Label>License Plate</Label>
              <Input type="text" placeholder="Enter plate number" />
            </FormGroup>
            <FormGroup>
              <Label>VIN Number</Label>
              <Input type="text" placeholder="Vehicle Identification Number" />
            </FormGroup>
            <FormGroup>
              <Label>Color</Label>
              <Input type="text" placeholder="Vehicle color" />
            </FormGroup>
          </FormGrid>

          <DocumentUpload>
            <h3>Required Documents</h3>
            <UploadGrid>
              <UploadBox 
                onClick={() => document.getElementById('ownership').click()}
                hasFile={uploadedFiles.ownership}
              >
                <FaUpload />
                <span>{uploadedFiles.ownership?.name || 'Proof of Ownership'}</span>
                <input 
                  id="ownership"
                  type="file" 
                  hidden 
                  onChange={(e) => handleFileUpload('ownership', e.target.files[0])}
                />
              </UploadBox>
              <UploadBox 
                onClick={() => document.getElementById('insurance').click()}
                hasFile={uploadedFiles.insurance}
              >
                <FaUpload />
                <span>{uploadedFiles.insurance?.name || 'Insurance Document'}</span>
                <input 
                  id="insurance"
                  type="file" 
                  hidden 
                  onChange={(e) => handleFileUpload('insurance', e.target.files[0])}
                />
              </UploadBox>
            </UploadGrid>
          </DocumentUpload>

          <FormActions>
            <Button secondary onClick={onClose}>Cancel</Button>
            <Button primary>Add Vehicle</Button>
          </FormActions>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  h2 {
    font-size: 1.5rem;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const VehicleTypeSelector = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
`;

const TypeOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 2px solid ${props => props.active ? '#007bff' : '#eee'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? '#f0f7ff' : 'white'};

  svg {
    font-size: 2rem;
    color: ${props => props.active ? '#007bff' : '#666'};
  }

  span {
    color: ${props => props.active ? '#007bff' : '#333'};
    font-weight: 500;
  }

  &:hover {
    border-color: #007bff;
  }
`;

const Form = styled.form`
  padding: 20px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const DocumentUpload = styled.div`
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 20px;

  h3 {
    margin-bottom: 20px;
    color: #333;
  }
`;

const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UploadBox = styled.div`
  border: 2px dashed ${props => props.hasFile ? '#28a745' : '#ddd'};
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 2rem;
    color: ${props => props.hasFile ? '#28a745' : '#007bff'};
  }

  span {
    color: ${props => props.hasFile ? '#28a745' : '#666'};
    text-align: center;
  }

  &:hover {
    background: #f8f9fa;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary && `
    background: #007bff;
    color: white;
    border: none;
    
    &:hover {
      background: #0056b3;
    }
  `}
  
  ${props => props.secondary && `
    background: #eee;
    color: #333;
    border: none;
    
    &:hover {
      background: #e1e1e1;
    }
  `}
`;

export default NewVehicleModal;
