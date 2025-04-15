import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ChildrenCard = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: all 0.3s ease;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 350px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

export const ChildrenIcon = styled.div`
  margin-bottom: 1.5rem;
  color: #4b9fe1;
  font-size: 2.5rem;
`;

export const ChildrenTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
  color: #fff;
  font-weight: 600;
`;

export const ChildrenButton = styled(Link)`
  background: linear-gradient(to right, #4b6cb7, #182848);
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1.5rem;
  box-shadow: 0 4px 15px rgba(75, 156, 225, 0.3);

  &:hover {
    background: linear-gradient(to right, #182848, #4b6cb7);
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(75, 156, 225, 0.4);
  }
`;

export const ChildrenContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem 0;
`;