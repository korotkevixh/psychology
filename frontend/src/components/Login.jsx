import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

const Title = styled.h2`
  margin-bottom: 32px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #1a202c;
`;
const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 24px;
  border: 1.5px solid #e0e7ef;
  border-radius: 12px;
  font-size: 17px;
  background: #f8fafc;
  color: #1a202c;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(37,99,235,0.04);
  &:focus {
    border: 1.5px solid #2563eb;
    outline: none;
    box-shadow: 0 4px 16px rgba(37,99,235,0.10);
  }
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
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  box-shadow: 0 2px 12px rgba(37,99,235,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover:enabled {
    background: linear-gradient(90deg, #1e40af 60%, #0ea5e9 100%);
    box-shadow: 0 4px 24px rgba(37,99,235,0.18);
  }
`;

const Login = () => {
  const [fio, setFio] = useState('');
  const [faculty, setFaculty] = useState('');
  const [course, setCourse] = useState('');
  const navigate = useNavigate();

  const isValid = fio.trim() && faculty.trim() && course.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const user = {
      fio,
      faculty,
      course,
      date: format(new Date(), 'yyyy-MM-dd HH:mm'),
    };
    localStorage.setItem('psy_user', JSON.stringify(user));
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Title>Вход для прохождения теста</Title>
      <Label htmlFor="fio">Фамилия, Имя, Отчество</Label>
      <Input id="fio" value={fio} onChange={e => setFio(e.target.value)} placeholder="Введите ФИО" autoFocus />
      <Label htmlFor="faculty">Факультет</Label>
      <Input id="faculty" value={faculty} onChange={e => setFaculty(e.target.value)} placeholder="Введите факультет" />
      <Label htmlFor="course">Курс</Label>
      <Input id="course" value={course} onChange={e => setCourse(e.target.value)} placeholder="Введите курс" />
      <Button type="submit" disabled={!isValid}>Начать тест</Button>
    </form>
  );
};

export default Login; 