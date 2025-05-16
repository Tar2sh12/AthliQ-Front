import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import { getAuthToken } from '../../services/auth';
import { useTranslation } from 'react-i18next';

const ResultsContainer = styled.div`
  background: #0a1128;
  min-height: 100vh;
  padding: 4rem 2rem;
  color: white;
`;

const ChildName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4b9fe1, #6a11cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #a9b3c1;
  text-align: center;
`;

const TestCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestCard = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 350px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const TestName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  color: #fff;
  font-weight: 600;
`;

const GradeCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  background: ${({ gradeLevel }) => {
    if (gradeLevel === 'Weak') return 'linear-gradient(135deg, #ff416c, #ff4b2b)';
    if (gradeLevel === 'Average') return 'linear-gradient(135deg, #f7b733, #fc4a1a)';
    return 'linear-gradient(135deg, #00b09b, #96c93d)';
  }};
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const EvaluationBadge = styled.div`
  background: ${({ evaluation }) => {
    switch (evaluation) {
      case 'Weak': return 'linear-gradient(135deg, #ff416c, #ff4b2b)';
      case 'Average': return 'linear-gradient(135deg, #f7b733, #fc4a1a)';
      case 'Excellent': return 'linear-gradient(135deg, #00b09b, #96c93d)';
      default: return 'linear-gradient(135deg, #00b09b, #96c93d)';
    }
  }};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
  margin-top: 1rem;
`;

const EnhanceButton = styled.button`
  background: linear-gradient(to right, #4b6cb7, #182848);
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 1.5rem auto 0;
  box-shadow: 0 4px 15px rgba(75, 156, 225, 0.3);
  
  &:hover {
    background: linear-gradient(to right, #182848, #4b6cb7);
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(75, 156, 225, 0.4);
  }
`;

const EnhanceContent = styled.div`
  background: rgba(26, 42, 108, 0.8);
  border-radius: 8px;
  padding: 1.2rem;
  margin-top: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const BackButton = styled(Link)`
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
  margin-top: 3rem;
  box-shadow: 0 4px 15px rgba(75, 156, 225, 0.3);
  
  &:hover {
    background: linear-gradient(to right, #182848, #4b6cb7);
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(75, 156, 225, 0.4);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 6px solid #4b9fe1;
    border-color: #4b9fe1 transparent #4b9fe1 transparent;
    animation: spin 1.2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 65, 108, 0.2);
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid rgba(255, 65, 108, 0.5);
`;

const SummarySection = styled.div`
  margin-top: 4rem;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(26, 42, 108, 0.8), rgba(10, 17, 40, 0.8));
  border-radius: 10px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.8s ease;
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SummaryHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
  font-weight: 700;
`;

const ChildTestResultsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [childData, setChildData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleEnhance, setVisibleEnhance] = useState({});
    const token = getAuthToken();
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await axios
            .get(`http://localhost:5155/api/Child/GetChildTestGrades`, {
              params: {
                childId: id
              },
              headers: {
                Authorization: `Bearer ${token.token}`,
              },
            })
            .then((response) => {
              if (response.data.statusCode === 200) {
                console.log(response);  
                setChildData(response.data.data);
              }
            });
        } catch (err) {
          setError(t('testsGrades.error.fetching_data'));
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    const toggleEnhance = (testId) => {
      setVisibleEnhance(prev => ({
        ...prev,
        [testId]: !prev[testId]
      }));
    };
  
    const getGradeLevelValue = (gradeLevel) => {
      switch (gradeLevel) {
        case 'Weak': return 1;
        case 'Average': return 2;
        case 'Excellent': return 3;
        default: return 0;
      }
    };
  
    const calculateAverageGrade = (tests) => {
      
      const total = tests.reduce((sum, test) => sum + getGradeLevelValue(i18n.language === 'ar' ? test.gradeLevelAr : test.gradeLevelEn), 0);
      const average = total / tests.length;
      
      if (average < 1.5) return 'Weak';
      if (average < 2.5) return 'Average';
      return 'Excellent';
    };
  
    if (loading) {
      return (
        <ResultsContainer>
          <LoadingSpinner />
        </ResultsContainer>
      );
    }
  
    if (error) {
      return (
        <ResultsContainer>
          <ErrorMessage>
            <h2>{t('testsGrades.common.error')}</h2>
            <p>{error}</p>
            <BackButton to="/">{t('testsGrades.navigation.back_home')}</BackButton>
          </ErrorMessage>
        </ResultsContainer>
      );
    }
  
    const overallEvaluation = calculateAverageGrade(childData.testGradesDtos);
  
    return (
      <ResultsContainer dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <ChildName>
          {t('testsGrades.test_results.title', { name: childData.name })}
        </ChildName>
        <IntroText>{t('testsGrades.test_results.subtitle')}</IntroText>
        
        <TestCardsContainer>
          {childData.testGradesDtos.map((test, index) => (
            <TestCard 
              key={test.testId}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
            {
              i18n.language === 'ar' ? (
                <TestName>{test.testNameAr}</TestName>
              ) : (
                <TestName>{test.testNameEn}</TestName>
              )
            }

              <GradeCircle gradeLevel={test.gradeLevelEn}>
                {test.testValue}
              </GradeCircle>
              
              {i18n.language === 'ar' ? (
                <EvaluationBadge evaluation={test.gradeLevelAr}>
                  {test.gradeLevelAr}
                </EvaluationBadge>
              ) : (
                <EvaluationBadge evaluation={test.gradeLevelEn}>
                  {test.gradeLevelEn}
                </EvaluationBadge>
              )}
              
              {test.howToEnhance && (
                <>
                  <EnhanceButton
                    onClick={() => toggleEnhance(test.testId)}
                  >
                    {visibleEnhance[test.testId] 
                      ? t('testsGrades.test_results.hide_enhancement') 
                      : t('testsGrades.test_results.how_to_enhance')}
                    <FaInfoCircle style={{ 
                      marginRight: i18n.language === 'ar' ? '8px' : '0',
                      marginLeft: i18n.language === 'ar' ? '0' : '8px'
                    }} />
                  </EnhanceButton>
                  
                  {visibleEnhance[test.testId] && (
                    <EnhanceContent>
                      {i18n.language === 'ar' ? test.howToEnhanceAr : test.howToEnhance}
                    </EnhanceContent>
                  )}
                </>
              )}
            </TestCard>
          ))}
        </TestCardsContainer>

        <SummarySection>
          <SummaryHeading>{t('testsGrades.test_results.overall_evaluation')}</SummaryHeading>
          <EvaluationBadge evaluation={overallEvaluation}>
            {overallEvaluation}
          </EvaluationBadge>
        </SummarySection>
        
        <BackButton to={`/addplayer/evaluatedTests/evaluatedCategories/${id}`}>
          {t('testsGrades.navigation.evaluate_child')}
        </BackButton>
      </ResultsContainer>
    );
};

export default ChildTestResultsPage;