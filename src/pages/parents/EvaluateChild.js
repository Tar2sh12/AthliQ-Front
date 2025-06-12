import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
  FaTrophy,
} from "react-icons/fa";
import axios from "axios";
import { getAuthToken } from "../../services/auth";
import { useTranslation } from "react-i18next";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { openDB } from "idb";
// Responsive breakpoints
const breakpoints = {
  small: "576px",
  medium: "1100px",
  large: "1200px",
  xlarge: "1446px",
};
const Button = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  background-color: #071c2f;
  color: white;
  border: none;
  flex-direction: ${({ $isRTL }) => ($isRTL ? "row-reverse" : "row")};

  &:hover {
    background-color: #0a2a47;
  }

  svg {
    margin-left: ${({ $isRTL }) => ($isRTL ? "0" : "6px")};
    margin-right: ${({ $isRTL }) => ($isRTL ? "6px" : "0")};
  }

  @media (min-width: ${breakpoints.small}) {
    padding: 8px 16px;
    font-size: 1rem;

    svg {
      margin-left: ${({ $isRTL }) => ($isRTL ? "0" : "8px")};
      margin-right: ${({ $isRTL }) => ($isRTL ? "8px" : "0")};
    }
  }
`;
const IntroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #a9b3c1;
  text-align: center;
`;
const CloseButton = styled(Button)`
  margin-top: 10px;
  background-color: #e74c3c;

  @media (min-width: ${breakpoints.small}) {
    margin-top: 12px;
  }

  &:hover {
    background-color: #c0392b;
  }
`;

const ResultsContainer = styled.div`
  background: #0a1128;
  min-height: 100vh;
  padding: 4rem 2rem;
  color: white;
`;

const Overlay = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 1000;
  padding: 15px;
`;

const PopupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 15px;

  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const PopupSvg = styled.svg`
  display: block;
  width: 100%;
  max-width: 150px;
  height: auto;
  margin: 0 auto;

  @media (min-width: ${breakpoints.medium}) {
    max-width: 200px;
  }
`;

const PopupCircle = styled.path`
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
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
  background: ${({ grade }) => {
    if (grade < 30) return "linear-gradient(135deg, #ff416c, #ff4b2b)";
    if (grade < 60) return "linear-gradient(135deg, #f7b733, #fc4a1a)";
    if (grade < 80) return "linear-gradient(135deg, #56ab2f, #a8e063)";
    return "linear-gradient(135deg, #00b09b, #96c93d)";
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
      case "Weak":
        return "linear-gradient(135deg, #ff416c, #ff4b2b)";
      case "Moderate":
        return "linear-gradient(135deg, #f7b733, #fc4a1a)";
      case "Good":
        return "linear-gradient(135deg, #56ab2f, #a8e063)";
      case "Very Good":
        return "linear-gradient(135deg, #00b09b, #96c93d)";
      default:
        return "linear-gradient(135deg, #00b09b, #96c93d)";
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
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SummarySection = styled.div`
  margin-top: 4rem;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(26, 42, 108, 0.8),
    rgba(10, 17, 40, 0.8)
  );
  border-radius: 10px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.8s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SummaryHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
  font-weight: 700;
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

const SportsContainer = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(26, 42, 108, 0.8),
    rgba(10, 17, 40, 0.8)
  );
  border-radius: 10px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 1.5rem;
`;

const SportCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const SportName = styled.h3`
  color: #4b9fe1;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SportDescription = styled.p`
  color: #a9b3c1;
  margin-top: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ReadMoreButton = styled.button`
  background: transparent;
  border: none;
  color: #4b9fe1;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  margin-top: 1rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;
const PopupBox = styled.div`
  background: #0a1128;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(75, 156, 225, 0.4);
  width: 100%;
  max-width: 1000px;
  text-align: center;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeInUp 0.5s ease-out forwards;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(75, 156, 225, 0.2);

  @media (min-width: ${breakpoints.small}) {
    padding: 25px;
    border-radius: 20px;
  }

  @media (min-width: ${breakpoints.medium}) {
    padding: 30px;
    border-radius: 24px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PopupTitle = styled.h2`
  color: #4b9fe1;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: 600;

  @media (min-width: ${breakpoints.medium}) {
    font-size: 1.75rem;
    margin-bottom: 20px;
  }
`;

const PopupText = styled.text`
  font-size: 1.5px;
  fill: #a9b3c1;
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: central;

  @media (min-width: ${breakpoints.small}) {
    font-size: 2px;
  }
`;
const DB_NAME = "ChildDataDB";
const STORE_NAME = "EvaluateResponse";

async function saveDataToIndexedDB(data) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });

  await db.put(STORE_NAME, data, "apiResponse");
}

async function getDataFromIndexedDB() {
  const db = await openDB(DB_NAME, 1);
  return await db.get(STORE_NAME, "apiResponse");
}

const ChildCategoriesResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getAuthToken();
  const { t, i18n } = useTranslation();
  const [evaluateResponse, setEvaluateResponse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [finalResult, setFinalResult] = useState("");
  const [childScores, setChildScores] = useState([]);
  const [matchedSports, setMatchedSports] = useState([]);
  const [bestCategory, setBestCategory] = useState("");
  const [bestCategoryAr, setBestCategoryAr] = useState("");
  const [expandedSports, setExpandedSports] = useState({});

  const toggleSportDescription = (sportId) => {
    setExpandedSports((prev) => ({
      ...prev,
      [sportId]: !prev[sportId],
    }));
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [categorizedScores, setCategorizedScores] = useState({
    largest: { num: -Infinity },
    largeMid: { num: -Infinity },
    smallMid: { num: Infinity },
    smallest: { num: Infinity },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(
          `http://localhost:5155/api/Child/EvaluteChildResult?childId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        setError(response.data.message);
        if (response.data.statusCode === 200) {
          const data = response.data.data;
          saveDataToIndexedDB(data);

          // Set the evaluation response
          setEvaluateResponse(data);

          // Process the scores with percentages
          const childWithstrokeDasharray =
            data.childResultWithPercentagesDtos.map((child) => ({
              ...child,
              strokeDasharray: `${child.percentage.split("%")[0]}, 100`,
            }));

          const numbers = childWithstrokeDasharray.map((child) =>
            parseFloat(child.percentage.split("%")[0])
          );
          const sortedNumbers = [...numbers].sort((a, b) => b - a);

          setCategorizedScores({
            largest: { num: sortedNumbers[0] },
            largeMid: { num: sortedNumbers[1] },
            smallMid: { num: sortedNumbers[2] },
            smallest: { num: sortedNumbers[3] },
          });

          setChildScores(childWithstrokeDasharray);
          setFinalResult(data.finalResult);

          // Extract the best category from finalResult
          var max= 0;
          var finalCatObj={};
          data.childResultIntegratedDto.forEach(category => {
            if(category.score>max) {
              max=category.score;
              finalCatObj=category;
              setBestCategory(category.category);
              setBestCategoryAr(category.categoryAr);
            }

          })
          


          // Set matched sports
          setMatchedSports(data.matchedSports || []);

          setShowPopup(true);
        } else {
          // toast.error(response.data.message);
          const data = await getDataFromIndexedDB();
          console.log(data);
          console.log(data.finalResult);
          setEvaluateResponse(data);
          // Process the scores with percentages
          const childWithstrokeDasharray =
            data.childResultWithPercentagesDtos.map((child) => ({
              ...child,
              strokeDasharray: `${child.percentage.split("%")[0]}, 100`,
            }));

          const numbers = childWithstrokeDasharray.map((child) =>
            parseFloat(child.percentage.split("%")[0])
          );
          const sortedNumbers = [...numbers].sort((a, b) => b - a);

          setCategorizedScores({
            largest: { num: sortedNumbers[0] },
            largeMid: { num: sortedNumbers[1] },
            smallMid: { num: sortedNumbers[2] },
            smallest: { num: sortedNumbers[3] },
          });

          setChildScores(childWithstrokeDasharray);
          setFinalResult(data.finalResult);

          // Extract the best category from finalResult
          var max= 0;
          var finalCatObj={};
          data.childResultIntegratedDto.forEach(category => {

            
            if(category.score>max) {
              max=category.score;
              setBestCategory(category.category);
            setBestCategoryAr(category.categoryAr);
            }

          })
          

          // Set matched sports
          setMatchedSports(data.matchedSports || []);
        }
      } catch (err) {
        console.error(err);
        setEvaluateResponse(null);
        toast.error(t("addPlayer.results.failed"));
        setError(t("addPlayer.results.failed"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, t]);

  if (loading) {
    return (
      <ResultsContainer>
        <LoadingSpinner />
      </ResultsContainer>
    );
  }

  if (!evaluateResponse) {
    return (
      <ResultsContainer>
        <ErrorMessage>
          <h2>{t("testsGrades.common.error")}</h2>
          <p>{error || "Failed to load evaluation data"}</p>
          <BackButton to="/">
            {t("testsGrades.navigation.back_home")}
          </BackButton>
        </ErrorMessage>
      </ResultsContainer>
    );
  }

  return (
    <>
      <ToastContainer
        position={i18n.language === "ar" ? "top-left" : "top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={i18n.language === "ar"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Overlay show={showPopup}>
        <PopupBox>
          <PopupTitle>{t("addPlayer.results.title")}</PopupTitle>
          <PopupContainer>
            {childScores.map((score, index) => {
              const percentage = parseFloat(score.percentage.split("%")[0]);
              let color = "#a9b3c1"; // Default color changed to match theme

              if (percentage === categorizedScores.largest.num) {
                color = "#4b9fe1"; // Blue for top score
              } else if (percentage === categorizedScores.largeMid.num) {
                color = "#6a11cb"; // Purple for second
              } else if (percentage === categorizedScores.smallMid.num) {
                color = "#f7b733"; // Yellow for third
              } else if (percentage === categorizedScores.smallest.num) {
                color = "#ff416c"; // Red for lowest
              }

              return (
                <PopupSvg key={index} viewBox="0 0 36 36">
                  <PopupCircle
                    stroke={color}
                    strokeDasharray={score.strokeDasharray}
                    d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <PopupText x="18" y="18" fill={color}>
                    {score.category} {score.percentage}
                  </PopupText>
                </PopupSvg>
              );
            })}
          </PopupContainer>

          {bestCategory && (
            <div style={{ margin: "20px 0" }}>
              <h3 style={{ color: "#4b9fe1", fontSize: "1.25rem" }}>
                {i18n.language === "ar" ? "أفضل فئة" : "Best Category"}:{" "}
                <span style={{ color: "#fff" }}>{bestCategory}</span>
              </h3>
            </div>
          )}

          <CloseButton onClick={togglePopup} $isRTL={i18n.language === "ar"}>
            {t("addPlayer.buttons.close")}
          </CloseButton>
        </PopupBox>
      </Overlay>

      <ResultsContainer dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <ChildName>
          {i18n.language === "ar"
            ? `نتائج تقييم الطفل`
            : `Child Evaluation Results`}
        </ChildName>

        <IntroText>
          {i18n.language === "ar"
            ? "تقرير مفصل لتقييم القدرات البدنية والرياضات المقترحة"
            : "Detailed report of physical abilities assessment and recommended sports"}
        </IntroText>

        <SummarySection>
          <SummaryHeading>
            {i18n.language === "ar" ? "ملخص التقييم" : "Evaluation Summary"}
          </SummaryHeading>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <FaTrophy
                style={{
                  fontSize: "3rem",
                  color: "#4b9fe1",
                  marginBottom: "1rem",
                }}
              />
              <GradeCircle
                grade={categorizedScores.largest.num}
                style={{ width: "150px", height: "150px", fontSize: "2.5rem" }}
              >
                {categorizedScores.largest.num}%
              </GradeCircle>
            </div>

            <div>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
                {i18n.language === "ar" ? "أفضل أداء" : "Top Performance"}
              </h3>
              <EvaluationBadge
                evaluation="Very Good"
                style={{ fontSize: "1.2rem", padding: "0.7rem 1.5rem" }}
              >
                {i18n.language === "ar" ? bestCategoryAr: bestCategory}
              </EvaluationBadge>

              <p style={{ marginTop: "1.5rem", color: "#a9b3c1" }}>
                {i18n.language === "ar"
                  ? "انقر على زر التقييم لعرض النتائج التفصيلية والرياضات المقترحة"
                  : "Click the evaluate button to view detailed results and recommended sports"}
              </p>

              <EnhanceButton onClick={togglePopup}>
                {i18n.language === "ar" ? "عرض التقييم" : "View Evaluation"}
              </EnhanceButton>
            </div>
          </div>
          {matchedSports.length > 0 && (
            <SportsContainer>
              <SummaryHeading>
                {i18n.language === "ar"
                  ? "الرياضات المقترحة"
                  : "Recommended Sports"}
              </SummaryHeading>

              <SportsGrid>
                {matchedSports.map((sport, index) => (
                  <SportCard key={index}>
                    <SportName>
                      {i18n.language === "ar" ? sport.arabicName : sport.name}
                      <ReadMoreButton
                        onClick={() => toggleSportDescription(index)}
                        aria-expanded={expandedSports[index]}
                      >
                        {expandedSports[index] ? (
                          <>
                            {i18n.language === "ar" ? "إخفاء" : "Read Less"}
                            <FaChevronUp size={12} />
                          </>
                        ) : (
                          <>
                            {i18n.language === "ar" ? "اقرأ أكثر" : "Read More"}
                            <FaChevronDown size={12} />
                          </>
                        )}
                      </ReadMoreButton>
                    </SportName>

                    {expandedSports[index] && (
                      <SportDescription>
                        {i18n.language === "ar"
                          ? sport.descriptionAr
                          : sport.description}
                      </SportDescription>
                    )}
                  </SportCard>
                ))}
              </SportsGrid>
            </SportsContainer>
          )}

          <BackButton to="/">
            {i18n.language === "ar"
              ? "العودة للصفحة الرئيسية"
              : "Back to Home page"}
          </BackButton>
        </SummarySection>
      </ResultsContainer>
    </>
  );
};

export default ChildCategoriesResultsPage;
