// Features.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '../../globalStyles';
import {
  FeatureText,
  FeatureTitle,
  FeatureWrapper,
  FeatureColumn,
  FeatureImageWrapper,
  FeatureName,
  FeatureTextWrapper,
} from './FeaturesStyles';
import { getFeaturesData } from '../../data/FeaturesData';

const Features = () => {
  const { t } = useTranslation();
  const featuresData = getFeaturesData(t);

  const initial = {
    y: 40,
    opacity: 0,
  };
  const animate = {
    y: 0,
    opacity: 1,
  };

  return (
    <Section smPadding="50px 10px" position="relative" inverse id="about">
      <Container>
        <FeatureTextWrapper>
          <FeatureTitle>{t("What We Offer")}</FeatureTitle>
        </FeatureTextWrapper>
        <FeatureWrapper>
          {featuresData.map((el, index) => (
            <FeatureColumn
              initial={initial}
              animate={animate}
              transition={{ duration: 0.5 + index * 0.1 }}
              key={index}
            >
              <FeatureImageWrapper className={el.imgClass}>
                {el.icon}
              </FeatureImageWrapper>
              <FeatureName>{el.name}</FeatureName>
              <FeatureText>{el.description}</FeatureText>
            </FeatureColumn>
          ))}
        </FeatureWrapper>
      </Container>
    </Section>
  );
};

export default Features;