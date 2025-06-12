import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../services/auth';
import axios from 'axios';
import { 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaVenus, 
  FaMars, 
  FaChild,
  FaUserCircle 
} from 'react-icons/fa';

// Styled Components
const Container = styled.div`
  background: #0a1128;
  min-height: 100vh;
  padding: 4rem 2rem 2rem;
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
  margin-bottom: 3rem;
  text-align: center;
  margin-top: 1rem;
`;

const ProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4b9fe1, #6a11cb);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(75, 159, 225, 0.3);
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
  
  @media (max-width: 576px) {
    width: 100px;
    height: 100px;
  }
`;

const UserName = styled.h1`
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

const FullName = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.1rem;
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(26, 42, 108, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(26, 42, 108, 0.5);
    transform: translateY(-2px);
  }
  
  @media (max-width: 576px) {
    padding: 0.8rem;
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4b9fe1, #6a11cb);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: 576px) {
    width: 35px;
    height: 35px;
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.2rem;
  
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const InfoValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: rgba(26, 42, 108, 0.5);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 150px;
  
  @media (max-width: 576px) {
    padding: 1rem;
    min-width: auto;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4b9fe1;
  margin-bottom: 0.5rem;
  
  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
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

const UserProfilePage = () => {
  const { t, i18n } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {token,user} = getAuthToken();
  const navigate = useNavigate();
  const uId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  const userId=user[uId];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5155/api/Account/ViewProfile`, {
          params: { userId: userId },
        });

        if (response.data.statusCode === 200) {
          console.log(response.data);
          setUserData(response.data.data);
        } else {
          setError(response.data.message || t('profile.profile.errorFetchingUserData'));
        }
      } catch (err) {
        setError(t('profile.profile.errorFetchingUserData'));
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, token, t]);

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? <FaMars /> : <FaVenus />;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getGenderTranslation = (gender) => {
    if (!gender) return '';
    return gender.toLowerCase() === 'male' ? t('profile.profile.male') : t('profile.profile.female');
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
          <h2>{t('profile.profile.error')}</h2>
          <p>{error}</p>
        </ErrorMessage>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <ErrorMessage>
          <h2>{t('profile.profile.noDataFound')}</h2>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>

      <ProfileHeader>
        <ProfileAvatar>
          {userData.profileImage ? (
            <img 
              src={userData.profileImage} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white' }}>
              {getInitials(userData.firstName, userData.lastName)}
            </span>
          )}
        </ProfileAvatar>
        <UserName>@{userData.userName}</UserName>
        <FullName>{userData.firstName} {userData.lastName}</FullName>
        
        <StatsContainer>
          <StatCard>
            <StatNumber>{userData.childrenCount}</StatNumber>
            <StatLabel>{t('profile.profile.children')}</StatLabel>
          </StatCard>
        </StatsContainer>
      </ProfileHeader>

      <Section>
        <SectionTitle>
          <FaUser /> {t('profile.profile.personalInformation')}
        </SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoIcon>
              <FaEnvelope />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>{t('profile.profile.emailAddress')}</InfoLabel>
              <InfoValue>{userData.email}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FaPhone />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>{t('profile.profile.phoneNumber')}</InfoLabel>
              <InfoValue>{userData.phoneNumber}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              {getGenderIcon(userData.gender)}
            </InfoIcon>
            <InfoContent>
              <InfoLabel>{t('profile.profile.gender')}</InfoLabel>
              <InfoValue>{getGenderTranslation(userData.gender)}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FaMapMarkerAlt />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>{t('profile.profile.address')}</InfoLabel>
              <InfoValue>{userData.address}</InfoValue>
            </InfoContent>
          </InfoItem>
        </InfoGrid>
      </Section>
    </Container>
  );
};

export default UserProfilePage;