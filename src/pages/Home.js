import React from "react";
import Carousel from "../components/Carousel/Carousel";
import { Content } from "../components/Content/Content";
import Features from "../components/Features/Features";
import Hero from "../components/Hero/Hero";
import { getHeroData } from "../data/HeroData";
import { useTranslation } from "react-i18next";
// Hero Feature Content Carousel

const Home = () => {
  const { t } = useTranslation();
  const { heroOne, heroTwo, heroThree } = getHeroData(t);
  return (
    <>
      <Hero />
      <Features />
      <Carousel />
      <Content {...heroOne} />
      <Content {...heroTwo} />
      <Content {...heroThree} />
    </>
  );
};

export default Home;
