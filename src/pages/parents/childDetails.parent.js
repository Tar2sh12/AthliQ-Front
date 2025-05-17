import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../services/auth';
import axios from 'axios';
import { FaArrowLeft, FaRunning, FaBalanceScale, FaHeartbeat, FaSchool, FaUsers } from 'react-icons/fa';

// Styled Components
const Container = styled.div`
  background: #0a1128;
  min-height: 100vh;
  padding: 4rem 2rem 2rem; /* Increased top padding to push content down */
  color: white;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem 1.5rem;
  }
  
  @media (max-width: 576px) {
    padding: 2.5rem 1rem 1rem;
  }
`;

const BackButton = styled.button`
  background: linear-gradient(to right, #4b6cb7, #182848);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: absolute;
  top: 1.5rem;
  left: 2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(75, 108, 183, 0.4);
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;
  margin-top: 1rem; /* Added margin to push content down */
`;

const ChildName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #4b9fe1, #6a11cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`;

const BasicInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    gap: 1rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const ChildImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 576px) {
    width: 100%;
    max-width: 250px;
    height: auto;
    aspect-ratio: 1/1;
  }
`;

const Section = styled.section`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b9fe1;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.4rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
`;

const SportsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const SportBadge = styled.div`
  background: linear-gradient(135deg, #00b09b, #96c93d);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  
  @media (max-width: 576px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const TestResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TestCard = styled.div`
  background: rgba(26, 42, 108, 0.5);
  border-radius: 8px;
  padding: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

const TestName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const TestResult = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4b9fe1;
  
  @media (max-width: 576px) {
    font-size: 1.3rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(75, 159, 225, 0.3);
  border-radius: 50%;
  border-top-color: #4b9fe1;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 65, 108, 0.2);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  margin: 2rem 0;
  border: 1px solid rgba(255, 65, 108, 0.5);
`;

const ChildDetailsPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5155/api/Child/ViewChildDetails`, {
          params: { childId: id },
          headers: { Authorization: `Bearer ${token.token}` }
        });

        if (response.data.statusCode === 200) {
          setChildData(response.data.data);
        } else {
          setError(response.data.message || t('childDetails.error.fetching_data'));
        }
      } catch (err) {
        setError(t('childDetails.error.fetching_data'));
      } finally {
        setLoading(false);
      }
    };

    fetchChildDetails();
  }, [id]);

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          <h2>{t('childDetails.common.error')}</h2>
          <p>{error}</p>
        </ErrorMessage>
      </Container>
    );
  }

  if (!childData) {
    return (
      <Container>
        <ErrorMessage>
          <h2>{t('childDetails.common.no_data')}</h2>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>


      <ProfileHeader>
        <ChildName>{childData.name}</ChildName>
        <BasicInfo>
          <InfoItem>
            <FaHeartbeat /> {t(`childDetails.gender.${childData.gender.toLowerCase()}`)}
          </InfoItem>
          <InfoItem>
            <FaBalanceScale /> {calculateAge(childData.dateOfBirth)} {t('childDetails.common.years_old')}
          </InfoItem>
          <InfoItem>
            <FaSchool /> {childData.schoolName}
          </InfoItem>
          {childData.clubName && (
            <InfoItem>
              <FaUsers /> {childData.clubName}
            </InfoItem>
          )}
        </BasicInfo>
      </ProfileHeader>


      <Section>
        <SectionTitle>
          <FaBalanceScale /> {t('childDetails.sections.physical_attributes')}
        </SectionTitle>
        <BasicInfo>
          <InfoItem>
            <strong>{t('childDetails.height')}:</strong> {childData.height} cm
          </InfoItem>
          <InfoItem>
            <strong>{t('childDetails.weight')}:</strong> {childData.weight} kg
          </InfoItem>
        </BasicInfo>
      </Section>

      <Section>
        <SectionTitle>
          <FaRunning /> {t('childDetails.sections.recommended_category')}
        </SectionTitle>
        <SportsContainer>
          <SportBadge key={1}>{i18n.language === 'ar' ? childData.categoryAr : childData.category}</SportBadge>
        </SportsContainer>
      </Section>

      <Section>
        <SectionTitle>
          <FaRunning /> {t('childDetails.sections.recommended_sports')}
        </SectionTitle>
        <SportsContainer>
          {i18n.language === 'ar' 
            ? childData.sportsAr.map((sport, index) => (
                <SportBadge key={index}>{sport}</SportBadge>
              ))
            : childData.sports.map((sport, index) => (
                <SportBadge key={index}>{sport}</SportBadge>
              ))
          }
        </SportsContainer>
      </Section>

      <Section>
        <SectionTitle>
          <FaRunning /> {t('childDetails.sections.test_results')}
        </SectionTitle>
        <TestResultsContainer>
          {childData.tests.map((test, index) => (
            <TestCard key={index}>
              <TestName>{i18n.language === 'ar' ? test.nameAr : test.name}</TestName>
              <TestResult>{test.testResult}</TestResult>
            </TestCard>
          ))}
        </TestResultsContainer>
      </Section>

      {childData.preferredSports && childData.preferredSports.length > 0 && (
        <Section>
          <SectionTitle>
            <FaHeartbeat /> {t('childDetails.sections.preferred_sports')}
          </SectionTitle>
          <SportsContainer>
            {childData.preferredSports.map((sport, index) => (
              <SportBadge key={index}>{sport}</SportBadge>
            ))}
          </SportsContainer>
        </Section>
      )}

      {childData.parentSportsHistory && childData.parentSportsHistory.length > 0 && (
        <Section>
          <SectionTitle>
            <FaUsers /> {t('childDetails.sections.parent_sports_history')}
          </SectionTitle>
          <SportsContainer>
            {childData.parentSportsHistory.map((sport, index) => (
              <SportBadge key={index}>{sport}</SportBadge>
            ))}
          </SportsContainer>
        </Section>
      )}


    </Container>
  );
};

export default ChildDetailsPage;