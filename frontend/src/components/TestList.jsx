import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const tests = [
  { id: 1, name: 'Тест на удовлетворенность жизнью' },
  { id: 2, name: 'Тест на стрессоустойчивость' },
];

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
`;
const Card = styled.div`
  background: #f8fafc;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.04);
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
`;
const Button = styled.button`
  padding: 10px 22px;
  background: linear-gradient(90deg, #2563eb 60%, #38bdf8 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(37,99,235,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1e40af 60%, #0ea5e9 100%);
    box-shadow: 0 4px 16px rgba(37,99,235,0.18);
  }
`;

const TestList = () => {
  const navigate = useNavigate();
  const handleStart = (testId) => {
    localStorage.setItem('psy_selected_test', testId);
    navigate('/instruction');
  };
  return (
    <List>
      {tests.map(test => (
        <Card key={test.id}>
          <Title>{test.name}</Title>
          <Button onClick={() => handleStart(test.id)}>Пройти тест</Button>
        </Card>
      ))}
    </List>
  );
};

export default TestList; 