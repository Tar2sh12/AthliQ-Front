import React from "react";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, MainHeading } from "../../globalStyles";
import {
  HeroImg,
  HeroSection,
  HeroText,
  ButtonWrapper,
  HeroButton,
} from "./HeroStyles";
import { getAuthToken } from "../../services/auth";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <HeroSection>
      <HeroImg src="./assets/backgroun-image.png" />
      <Container>
        <MainHeading>{t("Your Child is our Priority")}</MainHeading>
        <HeroText>
          {t("Hero Text")}
        </HeroText>
        <ButtonWrapper>
          <Button
            onClick={() => {
              const token = getAuthToken();
              if (token.token) {
                navigate("/children");
              } else {
                navigate("/login");
              }
            }}
          >
            {t("Get Started")}
          </Button>

          <HeroButton>{t("Find More")}</HeroButton>
        </ButtonWrapper>
      </Container>
    </HeroSection>
  );
};

export default Hero;