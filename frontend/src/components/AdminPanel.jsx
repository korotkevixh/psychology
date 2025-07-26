import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { Document, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType } from 'docx';
import { questions } from '../data/questions';

const PageTitle = styled.h2`
  margin-bottom: 28px;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
`;

const AdminPanelContainer = styled.div`
  padding: 20px;
  min-height: 500px;
`;

const Controls = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #e0e7ef;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 1rem;
  color: #1a202c;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #e0e7ef;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 1rem;
  color: #1a202c;
`;

const ExportButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(90deg, #10b981 60%, #34d399 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(16,185,129,0.15);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #059669 60%, #06b6d4 100%);
    box-shadow: 0 4px 16px rgba(16,185,129,0.25);
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const Th = styled.th`
  padding: 12px 15px;
  background: #e0e7ef;
  color: #2d3748;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  &:hover {
    background: #cdd5e0;
  }
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #edf2f7;
  color: #4a5568;
  font-size: 0.9rem;
`;

const AdminPanel = () => {
  const [allResults, setAllResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  const [filters, setFilters] = useState({
    fio: '',
    faculty: '',
    course: '',
    minScore: '',
    maxScore: '',
  });

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('psy_db') || '[]');
    setAllResults(storedResults);
  }, []);

  const sortedAndFilteredResults = useMemo(() => {
    let filterableResults = [...allResults];

    // Фильтрация
    if (filters.fio) {
      filterableResults = filterableResults.filter(r =>
        r.fio.toLowerCase().includes(filters.fio.toLowerCase())
      );
    }
    if (filters.faculty) {
      filterableResults = filterableResults.filter(r =>
        r.faculty.toLowerCase().includes(filters.faculty.toLowerCase())
      );
    }
    if (filters.course) {
      filterableResults = filterableResults.filter(r =>
        r.course.toLowerCase().includes(filters.course.toLowerCase())
      );
    }
    if (filters.minScore) {
      filterableResults = filterableResults.filter(r =>
        r.rawScore >= parseFloat(filters.minScore)
      );
    }
    if (filters.maxScore) {
      filterableResults = filterableResults.filter(r =>
        r.rawScore <= parseFloat(filters.maxScore)
      );
    }

    // Сортировка
    filterableResults.sort((a, b) => {
      // Special handling for nested properties like interpretation.summary
      const aValue = sortConfig.key.includes('.') ? sortConfig.key.split('.').reduce((o, i) => o[i], a) : a[sortConfig.key];
      const bValue = sortConfig.key.includes('.') ? sortConfig.key.split('.').reduce((o, i) => o[i], b) : b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return filterableResults;
  }, [allResults, sortConfig, filters]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ⬆️' : ' ⬇️';
    }
    return '';
  };

  const exportToWord = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: 'Отчет по результатам тестирования', bold: true, size: 32 })],
          }),
          new Paragraph({ text: '\n' }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('Дата')], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                  new TableCell({ children: [new Paragraph('ФИО')], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                  new TableCell({ children: [new Paragraph('Факультет')], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                  new TableCell({ children: [new Paragraph('Курс')], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                  new TableCell({ children: [new Paragraph('Результат (кратко)')], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                  new TableCell({ children: [new Paragraph('Баллы')], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                ],
              }),
              ...sortedAndFilteredResults.map(res => {
                const detailedAnswers = Object.entries(res.answers).map(([qId, ans]) => {
                  const questionDef = questions.find(q => q.id === parseInt(qId));
                  if (!questionDef) return '';
                  if (questionDef.type === 'GROUPED_QUESTION') {
                    const subAnswers = Object.entries(ans.a).map(([subId, ansIdx]) => {
                      const subQDef = questionDef.subQuestions.find(sq => sq.subId === subId);
                      return `${subQDef.text}: ${subQDef.options[ansIdx]}`;
                    }).join('; ');
                    return `${questionDef.text} (${subAnswers})`;
                  } else {
                    return `${questionDef.text}: ${questionDef.options[ans.a]}`;
                  }
                }).join('\n');

                return new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph(res.date)], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                    new TableCell({ children: [new Paragraph(res.fio)], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                    new TableCell({ children: [new Paragraph(res.faculty)], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                    new TableCell({ children: [new Paragraph(res.course)], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                    new TableCell({ children: [new Paragraph(res.interpretation?.summary || '-')], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                    new TableCell({ children: [new Paragraph(res.rawScore?.toString() || '-')], borders: { top: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, left: { style: BorderStyle.SINGLE, size: 1, color: '#000000' }, right: { style: BorderStyle.SINGLE, size: 1, color: '#000000' } } }),
                  ],
                });
              }),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: '\n' }),
          new Paragraph({
            children: [new TextRun({ text: 'Детальные ответы:', bold: true, size: 28 })],
          }),
          new Paragraph({ text: '\n' }),
          ...sortedAndFilteredResults.map(res => new Paragraph({
            children: [
              new TextRun({ text: `ФИО: ${res.fio}, Факультет: ${res.faculty}, Курс: ${res.course}, Дата: ${res.date}\n` }),
              new TextRun({ text: `Краткий результат: ${res.interpretation?.summary || '-'}\n` }),
              new TextRun({ text: `Баллы: ${res.rawScore?.toString() || '-'}\n` }),
              new TextRun({ text: 'Детальные ответы:', bold: true }),
              new TextRun({ text: '\n' }),
              ...Object.entries(res.answers).map(([qId, ans]) => {
                const questionDef = questions.find(q => q.id === parseInt(qId));
                if (!questionDef) return new TextRun({ text: '' });
                if (questionDef.type === 'GROUPED_QUESTION') {
                  const subAnswers = Object.entries(ans.a).map(([subId, ansIdx]) => {
                    const subQDef = questionDef.subQuestions.find(sq => sq.subId === subId);
                    return `${subQDef.text}: ${subQDef.options[ansIdx]}`;
                  }).join('; ');
                  return new TextRun({ text: `- ${questionDef.text} (${subAnswers})\n` });
                } else {
                  return new TextRun({ text: `- ${questionDef.text}: ${questionDef.options[ans.a]}\n` });
                }
              }),
              new TextRun({ text: '\n' }),
            ],
          })),
        ],
      }],
    });

    const blob = await doc.pack();
    saveAs(blob, 'Отчет_тестирования.docx');
  };

  return (
    <AdminPanelContainer>
      <PageTitle>База данных результатов тестирования</PageTitle>

      <Controls>
        <FilterGroup>
          <Label htmlFor="fioFilter">Фильтр по ФИО:</Label>
          <Input
            id="fioFilter"
            type="text"
            name="fio"
            value={filters.fio}
            onChange={handleFilterChange}
            placeholder="Введите ФИО"
          />
        </FilterGroup>
        <FilterGroup>
          <Label htmlFor="facultyFilter">Фильтр по Факультету:</Label>
          <Input
            id="facultyFilter"
            type="text"
            name="faculty"
            value={filters.faculty}
            onChange={handleFilterChange}
            placeholder="Введите факультет"
          />
        </FilterGroup>
        <FilterGroup>
          <Label htmlFor="courseFilter">Фильтр по Курсу:</Label>
          <Input
            id="courseFilter"
            type="text"
            name="course"
            value={filters.course}
            onChange={handleFilterChange}
            placeholder="Введите курс"
          />
        </FilterGroup>
        <FilterGroup>
          <Label htmlFor="minScoreFilter">Мин. баллы:</Label>
          <Input
            id="minScoreFilter"
            type="number"
            name="minScore"
            value={filters.minScore}
            onChange={handleFilterChange}
            placeholder="От"
          />
        </FilterGroup>
        <FilterGroup>
          <Label htmlFor="maxScoreFilter">Макс. баллы:</Label>
          <Input
            id="maxScoreFilter"
            type="number"
            name="maxScore"
            value={filters.maxScore}
            onChange={handleFilterChange}
            placeholder="До"
          />
        </FilterGroup>
        <ExportButton onClick={exportToWord}>Экспорт в Word</ExportButton>
      </Controls>

      <StyledTable>
        <thead>
          <tr>
            <Th onClick={() => requestSort('date')}>Дата{getSortIndicator('date')}</Th>
            <Th onClick={() => requestSort('fio')}>ФИО{getSortIndicator('fio')}</Th>
            <Th onClick={() => requestSort('faculty')}>Факультет{getSortIndicator('faculty')}</Th>
            <Th onClick={() => requestSort('course')}>Курс{getSortIndicator('course')}</Th>
            <Th onClick={() => requestSort('interpretation.summary')}>Результат{getSortIndicator('interpretation.summary')}</Th>
            <Th onClick={() => requestSort('rawScore')}>Баллы{getSortIndicator('rawScore')}</Th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredResults.map((res, index) => (
            <tr key={index}>
              <Td>{res.date}</Td>
              <Td>{res.fio}</Td>
              <Td>{res.faculty}</Td>
              <Td>{res.course}</Td>
              <Td>{res.interpretation?.summary || '-'}</Td>
              <Td>{res.rawScore || '-'}</Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </AdminPanelContainer>
  );
};

export default AdminPanel;
