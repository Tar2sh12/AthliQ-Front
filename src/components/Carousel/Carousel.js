import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useTranslation } from "react-i18next";
import { data, sliderSettings } from "../../data/CarouselData";
import { Row, Heading, Section, TextWrapper } from "../../globalStyles";
import {
  ButtonContainer,
  ReviewSlider,
  ImageWrapper,
  CarouselImage,
  CardButton,
} from "./CarouselStyles";

const Carousel = () => {
  const { t, i18n } = useTranslation();
  const [sliderRef, setSliderRef] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const data = [
    {
      title: t("Step 1: Data Collection"),
      description: t(
        "The system gathers essential details about the child, including:"
      ),
      points: [
        t("Physical attributes (height, weight, flexibility, endurance)"),
        t("Medical history (injuries, conditions affecting performance)"),
        t("Personal preferences & past sports experience"),
        t("Genetic & family sports history (if applicable)"),
      ],
      image: "./assets/dataCollection.png",
    },
    {
      title: t("Step2:AI"),
      description: t("AI-Based Evaluation with Drools Rule Engine"),
      points: [
        t("Drools Rule Engine processes the collected inputs and test scores."),
        t(
          "Defined rule sets classify the child's abilities based on performance thresholds."
        ),
        t(
          "AI compares the child's test results with benchmarks from professional athletes."
        ),
        t(
          "The system identifies the most suitable sports category based on predefined rules."
        ),
      ],
      image: "./assets/security.jpg",
    },
    {
      title: t("Step3"),
      description: t("Personalized Sports Recommendation"),
      points: [
        t(
          "The AI system provides sports recommendations tailored to the child's profile."
        ),
        t(
          "Each recommendation includes reasoning based on rule-based decision-making."
        ),
        t(
          "Parents and coaches receive a report with insights on strengths and improvement areas."
        ),
      ],
      image: "./assets/teamwork.jpg",
    },
    {
      title: t("Step4"),
      description: t("Continuous Learning & Optimization"),
      points: [
        t("The system refines recommendations as more data is gathered"),
        t("User feedback helps fine-tune the Drools rules for better accuracy"),
        t(
          "Future updates may integrate real-time motion tracking for advanced analysis"
        ),
      ],
      image: "./assets/dataCollection.png",
    },
  ];

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);

    // For RTL/LTR direction change
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  return (
    <Section margin="auto" maxWidth="1280px" padding="50px 70px" inverse>
      <Row justify="space-between" margin="1rem" wrap="wrap">
        <Heading width="auto" inverse>
          {t("How AthliQ Works")}
        </Heading>
        <div>
          <ButtonContainer>
            <IconContext.Provider value={{ size: "3rem", color: "#1d609c" }}>
              {i18n.language == "en" && (
                <>
                  <FaArrowCircleLeft onClick={sliderRef?.slickPrev} />
                  <FaArrowCircleRight onClick={sliderRef?.slickNext} />
                </>
              )}
              {i18n.language == "ar" && (
                <>
                  <FaArrowCircleRight onClick={sliderRef?.slickNext} />
                  <FaArrowCircleLeft onClick={sliderRef?.slickPrev} />
                </>
              )}
            </IconContext.Provider>
          </ButtonContainer>
        </div>
      </Row>

      <ReviewSlider {...sliderSettings} ref={setSliderRef}>
        {data.map((el, index) => (
          <ImageWrapper key={index}>
            <TextWrapper size="1.1rem" margin="0.4rem 0 0" weight="bold">
              {el.title}
            </TextWrapper>
            <TextWrapper size="0.9rem" margin="0.7rem" weight="bold">
              {el.description}
            </TextWrapper>
            {el.points.map((point, index) => (
              <TextWrapper
                size="0.9rem"
                margin="0.7rem"
                color="#4f4f4f"
                key={index}
              >
                {point}
              </TextWrapper>
            ))}
          </ImageWrapper>
        ))}
      </ReviewSlider>
    </Section>
  );
};

export default Carousel;
