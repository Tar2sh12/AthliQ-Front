import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChildrenCard, 
  ChildrenIcon, 
  ChildrenTitle, 
  ChildrenButton,
  ChildrenContainer
} from '../../components/Children/ChildrenStyles';
import { FaUserPlus, FaUsers } from 'react-icons/fa';

const ChildrenPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{
      background: '#0a1128',
      minHeight: '100vh',
      padding: '4rem 2rem',
      color: 'white',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        fontWeight: '700'
      }}>
        {t('childManagement.title')}
      </h1>
      
      <p style={{
        fontSize: '1.2rem',
        marginBottom: '3rem',
        color: '#a9b3c1'
      }}>
        {t('childManagement.subtitle')}
      </p>

      <ChildrenContainer>
        {/* Add New Child Card */}
        <ChildrenCard>
          <ChildrenIcon>
            <FaUserPlus />
          </ChildrenIcon>
          <ChildrenTitle>{t('childManagement.addNewChild.title')}</ChildrenTitle>
          <p style={{ color: '#c1c1c1', marginBottom: '1.5rem' }}>
            {t('childManagement.addNewChild.description')}
          </p>
          <ChildrenButton to="/instructions">
            {t('childManagement.addNewChild.button')}
          </ChildrenButton>
        </ChildrenCard>

        {/* View All Children Card */}
        <ChildrenCard>
          <ChildrenIcon>
            <FaUsers />
          </ChildrenIcon>
          <ChildrenTitle>{t('childManagement.viewAllChildren.title')}</ChildrenTitle>
          <p style={{ color: '#c1c1c1', marginBottom: '1.5rem' }}>
            {t('childManagement.viewAllChildren.description')}
          </p>
          <ChildrenButton to="/players">
            {t('childManagement.viewAllChildren.button')}
          </ChildrenButton>
        </ChildrenCard>
      </ChildrenContainer>
    </div>
  );
};

export default ChildrenPage;