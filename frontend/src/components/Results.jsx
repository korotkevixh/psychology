import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { questions } from '../data/questions'; // Импортируем вопросы

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
`;
const Block = styled.div`
  margin-bottom: 40px;
  color: #374151;
  font-size: 19px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 22px 18px;
  box-shadow: 0 2px 8px rgba(37,99,235,0.04);
`;
const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(90deg, #2563eb 60%, #38bdf8 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(37,99,235,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1e40af 60%, #0ea5e9 100%);
    box-shadow: 0 4px 24px rgba(37,99,235,0.18);
  }
`;

function interpret(answers) {
  let totalScore = 0;
  let interpretations = {};

  answers.forEach(userAnswer => {
    const questionDef = questions.find(q => q.id === userAnswer.q);
    if (!questionDef) return;

    if (questionDef.type === 'GROUPED_QUESTION') {
      for (const subId in userAnswer.a) {
        const subAnswerIndex = userAnswer.a[subId];
        const subQuestionDef = questionDef.subQuestions.find(sq => sq.subId === subId);
        if (subQuestionDef) {
          const option = subQuestionDef.options[subAnswerIndex];
          // Демонстрационная логика начисления баллов для разных типов подвопросов
          switch (subQuestionDef.type) {
            case 'SCALE_3_POSITIVE_NEGATIVE':
              if (option === 'Положительно') totalScore += 3;
              else if (option === 'Нейтрально') totalScore += 2;
              else if (option === 'Отрицательно') totalScore += 1;
              break;
            case 'SCALE_3_POSITIVE_NEGATIVE_REVERSE': // Обратная шкала
              if (option === 'Положительное') totalScore += 1;
              else if (option === 'Нейтральное') totalScore += 2;
              else if (option === 'Отрицательное') totalScore += 3;
              break;
            case 'SCALE_2_PRO_CON':
              if (option === 'чем полезно') totalScore += 1;
              else if (option === 'чем вредно') totalScore += 2;
              break;
            case 'SCALE_4_CONSUMPTION':
              if (option === 'Ежедневно употребляю') totalScore += 4;
              else if (option === 'Иногда употребляю') totalScore += 3;
              else if (option === 'Раньше употреблял(-а), но бросил(-а)') totalScore += 2;
              else if (option === 'Никогда не употреблял(-а)') totalScore += 1;
              break;
            case 'SCALE_4_GROUP_SIZE':
              if (option === 'Большинство') totalScore += 4;
              else if (option === 'Около половины') totalScore += 3;
              else if (option === 'Несколько человек') totalScore += 2;
              else if (option === 'Никто') totalScore += 1;
              break;
            case 'SCALE_4_EASY_HARD':
              if (option === 'Очень легко') totalScore += 4;
              else if (option === 'Довольно легко') totalScore += 3;
              else if (option === 'Довольно сложно') totalScore += 2;
              else if (option === 'Невозможно') totalScore += 1;
              break;
            default:
              break;
          }
        }
      }
    } else {
      const option = questionDef.options[userAnswer.a];
      // Демонстрационная логика начисления баллов для простых вопросов
      switch (questionDef.type) {
        case 'SCALE_4_ALWAYS':
          if (option === 'Всегда') totalScore += 4;
          else if (option === 'Часто') totalScore += 3;
          else if (option === 'Редко') totalScore += 2;
          else if (option === 'Никогда') totalScore += 1;
          break;
        case 'YES_NO':
          if (option === 'Да') totalScore += 1;
          // 'Нет' не добавляет баллы в этой простой логике
          break;
        case 'CUSTOM_CHOICE':
          if (option === 'скорее всего, заметят') totalScore += 1;
          break;
        case 'SCALE_4_ALWAYS_SOMETIMES_NEVER':
          if (option === 'Всегда') totalScore += 4;
          else if (option === 'Часто') totalScore += 3;
          else if (option === 'Иногда') totalScore += 2;
          else if (option === 'Никогда') totalScore += 1;
          break;
        default:
          break;
      }
    }
  });

  // Демонстрационная общая интерпретация на основе общего балла
  if (totalScore > 30) {
    interpretations.summary = 'Высокий уровень психологического благополучия.';
  } else if (totalScore > 15) {
    interpretations.summary = 'Средний уровень психологического благополучия.';
  } else {
    interpretations.summary = 'Низкий уровень психологического благополучия, возможно, требуется внимание.';
  }

  interpretations.detailed = `Набрано баллов: ${totalScore}. Это демонстрационная интерпретация. Для получения точных результатов необходим полноценный ключ тестирования.`;
  return interpretations;
}

const Results = () => {
  const navigate = useNavigate();
  const [interpretation, setInterpretation] = useState({ summary: '', detailed: '' });

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem('psy_answers')) || [];
    const user = JSON.parse(localStorage.getItem('psy_user')) || {};
    const resObject = interpret(answers);
    setInterpretation(resObject);

    // Сохраняем в базу специалиста
    const db = JSON.parse(localStorage.getItem('psy_db') || '[]');
    db.push({
      ...user,
      answers,
      interpretation: resObject, // Сохраняем полную интерпретацию
      rawScore: resObject.totalScore, // Можно добавить для удобства сортировки
    });
    localStorage.setItem('psy_db', JSON.stringify(db));

    // Очищаем выбранный тест и ответы
    localStorage.removeItem('psy_selected_test');
    localStorage.removeItem('psy_answers');
  }, []);

  const handleFinish = () => {
    navigate('/profile');
  };

  return (
    <div>
      <Title>Результаты теста</Title>
      <Block>
        <h3>Краткий результат:</h3>
        <p>{interpretation.summary}</p>
        <h3>Подробности:</h3>
        <p>{interpretation.detailed}</p>
      </Block>
      <Button onClick={handleFinish}>Завершить работу</Button>
    </div>
  );
};

export default Results; 