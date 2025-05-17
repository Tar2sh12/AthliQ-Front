import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import styled from "styled-components";
import { Row, Heading, TextWrapper } from "../../globalStyles";
import {
  ButtonContainer,
  ReviewSlider,
  CardButton,
} from "../Carousel/CarouselStyles";
import {
  PricingSection,
  PricingWrapper,
  EmptyState,
  PageButton,
  PaginationContainer,
  SearchContainer,
  SearchInput,
  PlayerCard,
  PlayerInfoWrapper,
} from "./PricingStyles";
import { getAuthToken } from "../../services/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  padding: ${({ padding }) => (padding ? padding : "140px 0")};
  margin: ${({ margin }) => (margin ? margin : "")};
  background: ${({ inverse }) => (inverse ? "white" : "#071c2f")};
  position: ${({ position }) => (position ? position : "")};
  width: ${({ width }) => (width ? width : "100%")};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : "auto")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "1200px")};
  height: ${({ height }) => (height ? height : "auto")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "auto")};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "auto")};

  @media screen and (max-width: 1200px) {
    max-width: 1000px;
    padding: ${({ smPadding }) => (smPadding ? smPadding : "50px 40px")};
  }

  @media screen and (max-width: 992px) {
    max-width: 800px;
  }

  @media screen and (max-width: 768px) {
    max-width: 90%;
    padding: ${({ smPadding }) => (smPadding ? smPadding : "40px 30px")};
  }

  @media screen and (max-width: 576px) {
    max-width: 95%;
    padding: ${({ smPadding }) => (smPadding ? smPadding : "30px 20px")};
  }
`;
const DetailsButton = styled.button`
  background: linear-gradient(to right, #4b6cb7, #182848);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(75, 108, 183, 0.4);
  }
`;
function Pricing() {
  const [sliderRef, setSliderRef] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = getAuthToken();
        setLoading(true);

        await axios
          .get(`http://localhost:5155/api/Child/ViewAllChildren`, {
            params: {
              pageSize: 6,
              pageIndex: currentPage,
              search: debouncedSearchTerm,
            },
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          })
          .then((response) => {
            if (response.data.statusCode === 200) {
              const data = response.data.value?.data || response.data.data;
              setPlayers(data.children);

              if (searchTerm === "") {
                setTotalPages(Math.ceil(data.totalCount / 6));
              } else {
                setTotalPages(Math.ceil(data.children.length / 6));
              }
            } else if (response.data.statusCode == 400) {
              setPlayers([]);
              setTotalPages(1);
              setCurrentPage(1);
              setError(response.data.message);
            }
          });

        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch players");
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [currentPage, debouncedSearchTerm]);

  const sliderSettings = {
    slidesToShow: Math.min(3, players.length),
    slidesToScroll: 1,
    infinite: players.length >= 3,
    arrows: players.length > 3,
    focusOnSelect: false,
    accessibility: false,
    variableWidth: false,
    centerMode: players.length < 3,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(2, players.length),
          centerMode: players.length < 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);

    const yearDiff = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (yearDiff > 0) {
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return `${yearDiff - 1} ${t("years old")}`;
      }
      return `${yearDiff} ${t("years old")}`;
    } else if (monthDiff > 0) {
      return `${monthDiff} months old`;
    } else {
      return `${Math.max(dayDiff, 0)} days old`;
    }
  };

  return (
    <IconContext.Provider value={{ color: "#a9b3c1", size: "1rem" }}>
      <PricingSection id="pricing">
        <PricingWrapper>
          <Heading>{t("Your Players")}</Heading>

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder={t("Search players...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          {loading ? (
            <div style={{ color: "white" }}>{t("Loading...")}</div>
          ) : players.length === 0 ? (
            <div style={{ color: "white" }}>{t("No players found")}</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <>
              <Section
                margin="auto"
                maxWidth="1500px"
                padding="50px 70px"
                inverse
              >
                <Row justify="space-between" margin="1rem" wrap="wrap">
                  <Heading width="auto" inverse>
                    {t("Your Players")}
                  </Heading>
                  {players.length > 3 && (
                    <ButtonContainer>
                      <IconContext.Provider
                        value={{ size: "3rem", color: "#1d609c" }}
                      >
                        <FaArrowCircleLeft onClick={sliderRef?.slickPrev} />
                        <FaArrowCircleRight onClick={sliderRef?.slickNext} />
                      </IconContext.Provider>
                    </ButtonContainer>
                  )}
                </Row>

                {players.length === 0 ? (
                  <EmptyState>
                    <TextWrapper size="1.2rem" margin="1rem 0">
                      {t("No players found. Add some players to get started!")}
                    </TextWrapper>
                  </EmptyState>
                ) : (
                  <ReviewSlider {...sliderSettings} ref={setSliderRef}>
                    {players.map((el, index) => (
                      <PlayerCard key={index}>
                        <PlayerInfoWrapper>
                          <TextWrapper
                            size="1.5rem"
                            margin="0.4rem 0 0"
                            weight="bold"
                          >
                            {el.name}
                          </TextWrapper>
                          <TextWrapper
                            size="1rem"
                            margin="0.7rem"
                            color="#4f4f4f"
                          >
                            {t(`${el.gender}`)}
                          </TextWrapper>
                          <TextWrapper
                            size="1.1rem"
                            margin="0.4rem 0 0"
                            weight="bold"
                          >
                            {calculateAge(el.dateOfBirth)}
                          </TextWrapper>
                        </PlayerInfoWrapper>
                        <CardButton>
                          {i18n.language === "en" ? el.category : el.categoryAr}
                        </CardButton>
                        <DetailsButton
                          onClick={() => navigate(`/childDetails/${el.id}`)}
                        >
                          {t("View Details")}
                        </DetailsButton>
                      </PlayerCard>
                    ))}
                  </ReviewSlider>
                )}
              </Section>

              {totalPages > 1 && (
                <PaginationContainer>
                  <PageButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    {t("Previous")}
                  </PageButton>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PageButton
                        key={page}
                        onClick={() => handlePageChange(page)}
                        active={page === currentPage}
                      >
                        {page}
                      </PageButton>
                    )
                  )}

                  <PageButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    {t("Next")}
                  </PageButton>
                </PaginationContainer>
              )}
            </>
          )}
        </PricingWrapper>
      </PricingSection>
    </IconContext.Provider>
  );
}

export default Pricing;
