import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TestList from './TestList';

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
`;
const Info = styled.div`
  margin-bottom: 36px;
  color: #374151;
  font-size: 18px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px 16px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.04);
`;
const Row = styled.div`
  margin-bottom: 10px;
`;
const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #2563eb 60%, #38bdf8 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(37,99,235,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1e40af 60%, #0ea5e9 100%);
    box-shadow: 0 4px 24px rgba(37,99,235,0.18);
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('psy_user'));
  const [showTests, setShowTests] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <Title>Профиль</Title>
      <Info>
        <Row><b>ФИО:</b> {user.fio}</Row>
        <Row><b>Факультет:</b> {user.faculty}</Row>
        <Row><b>Курс:</b> {user.course}</Row>
        <Row><b>Дата входа:</b> {user.date}</Row>
      </Info>
      {!showTests && (
        <Button onClick={() => setShowTests(true)}>Список тестов</Button>
      )}
      {showTests && <TestList />}
    </div>
  );
};

export default Profile; 