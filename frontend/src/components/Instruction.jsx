import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h2`
  margin-bottom: 28px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
`;
const Text = styled.p`
  margin-bottom: 40px;
  color: #374151;
  font-size: 18px;
  line-height: 1.6;
  background: #f8fafc;
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.04);
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

const Instruction = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('psy_selected_test')) {
      navigate('/profile');
    }
  }, [navigate]);
  return (
    <div>
      <Title>Инструкция по прохождению теста</Title>
      <Text>
        Пожалуйста, внимательно прочитайте каждое утверждение и выберите тот вариант ответа, который наиболее точно отражает ваше мнение или состояние. На каждый вопрос можно выбрать только один вариант ответа. После выбора ответа нажмите кнопку "Далее" для перехода к следующему вопросу. На последнем вопросе нажмите "Завершить тест" для получения результатов.
      </Text>
      <Button onClick={() => navigate('/test')}>С инструкцией ознакомлен</Button>
    </div>
  );
};

export default Instruction; 