import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { questions } from '../data/questions';

const Title = styled.h2`
  margin-bottom: 28px; /* Немного больше отступ для заголовка */
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
`;
const QuestionContainer = styled.div`
  margin-bottom: 36px; /* Отступ между вопросами */
  padding: 20px 18px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
`;
const QuestionText = styled.h3`
  margin-bottom: 24px;
  font-size: 20px;
  color: #222;
  font-weight: 600;
`;
const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
`;
const OptionBtn = styled.button`
  flex: 1;
  min-width: 120px;
  padding: 14px 0;
  background: ${({selected}) => (selected ? 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)' : '#f1f5f9')};
  color: ${({selected}) => (selected ? '#fff' : '#222')};
  border: 2px solid ${({selected}) => (selected ? '#2563eb' : '#e0e7ef')};
  border-radius: 12px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(37,99,235,0.04);
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1e40af 60%, #0ea5e9 100%);
    color: #fff;
    border: 2px solid #2563eb;
  }
`;
const GroupedQuestionSection = styled.div`
  margin-top: 24px;
  border-top: 1px solid #e0e7ef;
  padding-top: 24px;
`;
const SubQuestionText = styled.div`
  font-size: 17px;
  color: #374151;
  margin-bottom: 10px;
  font-weight: 500;
`;
const SubOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  margin-bottom: 18px;
`;
const SubOptionBtn = styled.button`
  padding: 10px 0;
  background: ${({selected}) => (selected ? '#38bdf8' : '#e2e8f0')};
  color: ${({selected}) => (selected ? '#fff' : '#475569')};
  border: 1px solid ${({selected}) => (selected ? '#0ea5e9' : '#cbd5e1')};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover {
    background: #0ea5e9;
    color: #fff;
    border: 1px solid #0ea5e9;
  }
`;
const CompleteButton = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(90deg, #2563eb 60%, #38bdf8 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  box-shadow: 0 4px 20px rgba(37,99,235,0.15);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover:enabled {
    background: linear-gradient(90deg, #1e40af 60%, #0ea5e9 100%);
    box-shadow: 0 6px 28px rgba(37,99,235,0.25);
  }
  margin-top: 40px; /* Отступ сверху */
`;

const Test = () => {
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: answerIndex } или { questionId: { subId: answerIndex } }
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('psy_selected_test')) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleSelect = (questionId, optionIndex, subId = null) => {
    if (subId) {
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: {
          ...(prev[questionId] || {}),
          [subId]: optionIndex,
        },
      }));
    } else {
      setUserAnswers(prev => ({
        ...prev,
        [questionId]: optionIndex,
      }));
    }
  };

  const isTestComplete = () => {
    return questions.every(q => {
      if (q.type === 'GROUPED_QUESTION') {
        const currentGroupAnswers = userAnswers[q.id];
        return q.subQuestions.every(subQ => currentGroupAnswers && currentGroupAnswers[subQ.subId] !== undefined);
      } else {
        return userAnswers[q.id] !== undefined;
      }
    });
  };

  const handleSubmitTest = () => {
    // Преобразуем userAnswers в формат, который ожидает Results.jsx
    const formattedAnswers = questions.map(q => {
      if (q.type === 'GROUPED_QUESTION') {
        return { q: q.id, a: userAnswers[q.id] || {} };
      } else {
        return { q: q.id, a: userAnswers[q.id] };
      }
    });
    localStorage.setItem('psy_answers', JSON.stringify(formattedAnswers));
    navigate('/results');
  };

  return (
    <div>
      <Title>Прохождение теста</Title>
      {
        questions.map(q => (
          <QuestionContainer key={q.id}>
            <QuestionText>{q.text}</QuestionText>
            {q.type === 'GROUPED_QUESTION' ? (
              <GroupedQuestionSection>
                {q.subQuestions.map(subQ => (
                  <div key={subQ.subId}>
                    <SubQuestionText>{subQ.text}</SubQuestionText>
                    <SubOptionsGrid>
                      {subQ.options.map((opt, idx) => (
                        <SubOptionBtn
                          key={opt}
                          type="button"
                          selected={userAnswers[q.id]?.[subQ.subId] === idx}
                          onClick={() => handleSelect(q.id, idx, subQ.subId)}
                        >
                          {opt}
                        </SubOptionBtn>
                      ))}
                    </SubOptionsGrid>
                  </div>
                ))}
              </GroupedQuestionSection>
            ) : (
              <OptionsContainer>
                {q.options.map((opt, idx) => (
                  <OptionBtn
                    key={opt}
                    type="button"
                    selected={userAnswers[q.id] === idx}
                    onClick={() => handleSelect(q.id, idx)}
                  >
                    {opt}
                  </OptionBtn>
                ))}
              </OptionsContainer>
            )}
          </QuestionContainer>
        ))
      }
      <CompleteButton onClick={handleSubmitTest} disabled={!isTestComplete()}>
        Завершить тест
      </CompleteButton>
    </div>
  );
};

export default Test;
