import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const InstructionsContainer = styled.div`
  background: linear-gradient(135deg, #0a1128 0%, #1a2a6c 100%);
  min-height: calc(100vh - 80px); /* طرح ارتفاع الـ Navbar */
  color: white;
  font-family: 'Arial', sans-serif;
  padding: 1.5rem;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const InstructionsContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const InstructionsTitle = styled.h1`
  font-size: 1.8rem; /* تصغير حجم العنوان */
  margin-bottom: 1.2rem;
  color: #4b9fe1;
  text-align: center;
  font-weight: 700;
  padding-top: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem; /* تصغير حجم العناوين الفرعية */
  margin: 1.5rem 0 0.8rem;
  color: #4b9fe1;
  font-weight: 600;
  display: flex;
  align-items: center;

  &:before {
    content: '*';
    margin-right: 0.5rem;
    color: #4b9fe1;
  }
`;

export const InstructionText = styled.p`
  font-size: 1rem; /* تصغير حجم النص العام */
  line-height: 1.5;
  margin-bottom: 0.8rem;
  color: #e0e0e0;
`;

export const ImportantNote = styled.span`
  color: #4b9fe1;
  font-weight: 600;
  font-size: 1rem;
`;

export const InstructionList = styled.ul`
  margin-left: 1rem;
  margin-bottom: 1.2rem;
  padding-left: 1rem;
`;

export const InstructionItem = styled.li`
  font-size: 1rem; /* تصغير حجم نقاط القائمة */
  line-height: 1.5;
  margin-bottom: 0.6rem;
  color: #e0e0e0;
  position: relative;
  padding-left: 1.2rem;

  &:before {
    content: '-';
    position: absolute;
    left: 0;
    color: #4b9fe1;
  }
`;

export const NextButton = styled(Link)`
  background: ${({ disabled }) => disabled ? '#3a4a6d' : 'linear-gradient(to right, #4b6cb7, #182848)'};
  color: white;
  padding: 0.8rem 2rem; /* تصغير حجم الزر */
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
  border: none;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  font-size: 1rem; /* تصغير حجم نص الزر */
  margin: 1.5rem auto 0;
  box-shadow: 0 4px 15px rgba(75, 156, 225, 0.3);
  opacity: ${({ disabled }) => disabled ? 0.7 : 1};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
  text-align: center;

  &:hover {
    background: ${({ disabled }) => disabled ? '#3a4a6d' : 'linear-gradient(to right, #182848, #4b6cb7)'};
    transform: ${({ disabled }) => disabled ? 'none' : 'scale(1.03)'};
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
`;

export const CheckboxLabel = styled.label`
  color: #e0e0e0;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1rem; /* تصغير حجم نص التأكيد */
`;