import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../config';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/admin/documents`, {
        headers: { 'x-auth-token': token }
      });
      const data = await response.json();
      setDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const updateDocumentStatus = async (documentId, status) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/api/admin/documents/${documentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ status })
      });
      fetchDocuments(); // Refresh documents list
    } catch (error) {
      console.error('Error updating document status:', error);
    }
  };

  return (
    <Container>
      <Header>
        <h2>Document Management</h2>
        <FilterSection>
          <Select defaultValue="all">
            <option value="all">All Documents</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </Select>
        </FilterSection>
      </Header>

      {loading ? (
        <LoadingMessage>Loading documents...</LoadingMessage>
      ) : (
        <DocumentsGrid>
          {documents.map(doc => (
            <DocumentCard key={doc._id}>
              <DocumentInfo>
                <h3>{doc.type}</h3>
                <p>Vehicle: {doc.vehicle.make} {doc.vehicle.model}</p>
                <p>Owner: {doc.user.name}</p>
                <p>Status: <StatusBadge status={doc.status}>{doc.status}</StatusBadge></p>
                <p>Submitted: {new Date(doc.createdAt).toLocaleDateString()}</p>
              </DocumentInfo>
              <DocumentActions>
                <ViewButton onClick={() => window.open(doc.fileUrl, '_blank')}>
                  View Document
                </ViewButton>
                <ActionButtons>
                  <ApproveButton 
                    disabled={doc.status === 'approved'}
                    onClick={() => updateDocumentStatus(doc._id, 'approved')}
                  >
                    Approve
                  </ApproveButton>
                  <RejectButton 
                    disabled={doc.status === 'rejected'}
                    onClick={() => updateDocumentStatus(doc._id, 'rejected')}
                  >
                    Reject
                  </RejectButton>
                </ActionButtons>
              </DocumentActions>
            </DocumentCard>
          ))}
        </DocumentsGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const DocumentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const DocumentInfo = styled.div`
  margin-bottom: 15px;

  h3 {
    margin: 0 0 10px 0;
    text-transform: capitalize;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  background: ${props => {
    switch(props.status) {
      case 'approved': return '#e6f4ea';
      case 'rejected': return '#fce8e6';
      default: return '#fff3e0';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'approved': return '#1e8e3e';
      case 'rejected': return '#d93025';
      default: return '#f9ab00';
    }
  }};
`;

const DocumentActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ViewButton = styled(Button)`
  background: #f8f9fa;
  color: #1a73e8;
  width: 100%;
  
  &:hover {
    background: #e8f0fe;
  }
`;

const ApproveButton = styled(Button)`
  background: #1e8e3e;
  color: white;
  flex: 1;
  
  &:hover:not(:disabled) {
    background: #137333;
  }
`;

const RejectButton = styled(Button)`
  background: #d93025;
  color: white;
  flex: 1;
  
  &:hover:not(:disabled) {
    background: #b3261e;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export default DocumentManagement;
