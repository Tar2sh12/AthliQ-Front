import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaSearch,
  FaUser,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";
import styled from "styled-components";
import { Row, Heading, TextWrapper } from "../../globalStyles";
import {
  ButtonContainer,
  ReviewSlider,
  CardButton,
} from "../Carousel/CarouselStyles";
import { getAuthToken } from "../../services/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Updated styled components with ChildDetailsPage theme
const PricingSection = styled.section`
  background: #0a1128;
  min-height: 100vh;
  padding: 4rem 2rem;
  color: white;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: 576px) {
    padding: 6rem 1rem;
  }
`;

const PricingWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Section = styled.section`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

const MainHeading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  background: rgba(26, 42, 108, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1rem;
  width: 100%;
  max-width: 400px;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: #4b9fe1;
    box-shadow: 0 0 0 2px rgba(75, 159, 225, 0.2);
  }

  @media (max-width: 576px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const PlayerCard = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 0 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 576px) {
    padding: 1.2rem;
  }
`;

const PlayerInfoWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const PlayerName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #4b9fe1;
  font-weight: bold;

  @media (max-width: 576px) {
    font-size: 1.3rem;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const CategoryBadge = styled.div`
  background: linear-gradient(135deg, #00b09b, #96c93d);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;

  @media (max-width: 576px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
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
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(75, 108, 183, 0.4);
  }

  @media (max-width: 576px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 576px) {
    padding: 2rem 1rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(75, 159, 225, 0.3);
  border-radius: 50%;
  border-top-color: #4b9fe1;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  background: ${({ active }) =>
    active
      ? "linear-gradient(135deg, #4b9fe1, #6a11cb)"
      : "rgba(26, 42, 108, 0.5)"};
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${({ active }) => (active ? "600" : "400")};

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #4b9fe1, #6a11cb);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 576px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 65, 108, 0.2);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  margin: 2rem 0;
  border: 1px solid rgba(255, 65, 108, 0.5);
  color: white;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NavButton = styled.button`
  background: linear-gradient(135deg, #4b9fe1, #6a11cb);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(75, 159, 225, 0.4);
  }
`;
const ActionButtons = {
  display: "flex",
  gap: "0.5rem",
};

const ActionButton = {
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "8px",
  padding: "0.5rem",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontSize: "0.9rem",
};

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
  useEffect(() => {


    fetchPlayers();
  }, [currentPage, debouncedSearchTerm]);

  const sliderSettings = {
    slidesToShow: Math.min(3, players.length),
    slidesToScroll: 1,
    infinite: players.length >= 3,
    arrows: false,
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
    <IconContext.Provider value={{ color: "#4b9fe1", size: "1.2rem" }}>
      <PricingSection id="pricing">
        <PricingWrapper>
          <MainHeading>{t("Your Players")}</MainHeading>

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder={t("Search players...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          {loading ? (
            <LoadingContainer>
              <Spinner />
            </LoadingContainer>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <Section>
              {players.length > 3 && (
                <NavigationButtons>
                  <NavButton onClick={sliderRef?.slickPrev}>
                    <FaArrowCircleLeft />
                  </NavButton>
                  <NavButton onClick={sliderRef?.slickNext}>
                    <FaArrowCircleRight />
                  </NavButton>
                </NavigationButtons>
              )}

              {players.length === 0 ? (
                <EmptyState>
                  <FaUser
                    size={48}
                    style={{ marginBottom: "1rem", opacity: 0.5 }}
                  />
                  <h3>{t("No players found")}</h3>
                  <p>{t("Add some players to get started!")}</p>
                </EmptyState>
              ) : (
                <ReviewSlider {...sliderSettings} ref={setSliderRef}>
                  {players.map((el, index) => (
                    <PlayerCard key={index}>
                      <div style={ActionButtons}>
                        <button
                          style={ActionButton}
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this child?"
                              )
                            ) {
                              setLoading(true);
                              const token = getAuthToken();
                              try {
                                // API call: DELETE /api/Test/DeleteTest?id=${testId}
                                console.log(token.token, el.id);
                                await axios.put(
                                  `http://localhost:5155/api/Child/DeleteChild?childId=${el.id}`,null,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token.token}`,
                                    },
                                  }
                                ).then((response) => {
                                  fetchPlayers();
                                }).catch((error) => {
                                  console.error(error);
                                })

                                fetchPlayers();
                              } catch (error) {
                                console.error("Error deleting child:", error);
                              } finally {
                                setLoading(false);
                              }
                            }
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.background =
                              "rgba(220, 53, 69, 0.2)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.background =
                              "rgba(255, 255, 255, 0.1)")
                          }
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <PlayerInfoWrapper>
                        <PlayerName>{el.name}</PlayerName>
                        <PlayerInfo>
                          <FaUser /> {t(`${el.gender}`)}
                        </PlayerInfo>
                        <PlayerInfo>
                          <FaCalendarAlt /> {calculateAge(el.dateOfBirth)}
                        </PlayerInfo>
                      </PlayerInfoWrapper>
                      <CategoryBadge>
                        {i18n.language === "en" ? el.category : el.categoryAr}
                      </CategoryBadge>
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
          )}

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
        </PricingWrapper>
      </PricingSection>
    </IconContext.Provider>
  );
}

export default Pricing;
