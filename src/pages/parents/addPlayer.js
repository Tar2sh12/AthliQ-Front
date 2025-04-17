import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getAuthToken } from "../../services/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// Test GIFs
import SitandReachFlexibility from "../../assets/tests-gif/Sit-and-Reach-Flexibility.gif";
import MedicineBallPush1kgFromStandingPosition from "../../assets/tests-gif/Medicine Ball Push (1 kg) from Standing Position.gif";
import OneLegStand from "../../assets/tests-gif/One-Leg-Stand.png";
import StandingLongJumpTest from "../../assets/tests-gif/Standing-Long-Jump-Test.webp";
import SitUpTest30seconds from "../../assets/tests-gif/Sit-up Test (30 seconds).jpg";

// Responsive breakpoints
const breakpoints = {
  small: "576px",
  medium: "1100px",
  large: "1200px",
  xlarge: "1446px",
};

// Styled Components with Responsive Design
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f1f5f9;
  font-family: sans-serif;
  direction: ${({ $isRTL }) => ($isRTL ? "rtl" : "ltr")};
`;

const Navbar = styled.div`
  height: 80px;
  background-color: #101522;

  @media (min-width: ${breakpoints.medium}) {
    height: 100px;
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 15px 0;

  @media (min-width: ${breakpoints.medium}) {
    padding: 20px 0;
  }
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 15px;

  @media (min-width: ${breakpoints.small}) {
    width: 90%;
    padding: 20px;
  }

  @media (min-width: ${breakpoints.large}) {
    max-width: 1200px;
  }
`;

const FormSection = styled.section`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (min-width: ${breakpoints.small}) {
    padding: 20px;
  }

  @media (min-width: ${breakpoints.medium}) {
    padding: 24px;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: #334155;

  @media (min-width: ${breakpoints.medium}) {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 8px;

  @media (min-width: ${breakpoints.medium}) {
    margin-bottom: 32px;
    flex-wrap: nowrap;
    gap: 0;
  }
`;

const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  @media (min-width: ${breakpoints.medium}) {
    margin-bottom: 0;
  }
`;

const ProgressNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active }) => (active ? "#071C2F" : "#cbd5e1")};
  color: ${({ active }) => (active ? "white" : "inherit")};
  font-size: 0.875rem;

  @media (min-width: ${breakpoints.medium}) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
`;

const ProgressLabel = styled.div`
  margin-left: ${({ $isRTL }) => ($isRTL ? "0" : "8px")};
  margin-right: ${({ $isRTL }) => ($isRTL ? "8px" : "0")};
  color: ${({ active }) => (active ? "#071C2F" : "#64748b")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};

  @media (min-width: ${breakpoints.medium}) {
    font-size: 1rem;
  }
`;

const ProgressConnector = styled.div`
  display: none;

  @media (min-width: ${breakpoints.medium}) {
    display: block;
    width: 40px;
    height: 2px;
    background-color: #cbd5e1;
    margin: 0 8px;
  }

  @media (min-width: ${breakpoints.large}) {
    width: 64px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 12px;

  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 16px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 12px;

  @media (min-width: ${breakpoints.small}) {
    margin-bottom: 16px;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  color: #334155;
  font-weight: 500;
  font-size: 0.875rem;

  @media (min-width: ${breakpoints.small}) {
    margin-bottom: 8px;
    font-size: 1rem;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  text-align: ${({ $isRTL }) => ($isRTL ? "right" : "left")};

  &:focus {
    outline: none;
    border-color: #071c2f;
  }

  @media (min-width: ${breakpoints.small}) {
    padding: 8px 12px;
    font-size: 1rem;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  text-align: ${({ $isRTL }) => ($isRTL ? "right" : "left")};

  &:focus {
    outline: none;
    border-color: #071c2f;
  }

  @media (min-width: ${breakpoints.small}) {
    padding: 8px 12px;
    font-size: 1rem;
  }
`;

const FormCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  flex-direction: ${({ $isRTL }) => ($isRTL ? "row-reverse" : "row")};
`;

const FormCheckbox = styled.input`
  margin-right: ${({ $isRTL }) => ($isRTL ? "0" : "8px")};
  margin-left: ${({ $isRTL }) => ($isRTL ? "8px" : "0")};
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;

  @media (min-width: ${breakpoints.small}) {
    font-size: 0.875rem;
  }
`;

const TestImage = styled.img`
  width: 100%;
  max-width: 192px;
  height: auto;
  aspect-ratio: 3/2;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${breakpoints.small}) {
    width: 192px;
    height: 128px;
  }
`;

const TestDescription = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 6px;
  text-align: ${({ $isRTL }) => ($isRTL ? "right" : "left")};

  @media (min-width: ${breakpoints.small}) {
    font-size: 0.875rem;
    margin-bottom: 8px;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
  margin-top: 24px;

  @media (min-width: ${breakpoints.small}) {
    flex-direction: ${({ $isRTL }) => ($isRTL ? "row-reverse" : "row")};
    justify-content: space-between;
    margin-top: 32px;
  }
`;

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

const EvaluateButton = styled(Button)`
  background-color: #071c2f;
  padding: 6px 12px;

  @media (min-width: ${breakpoints.small}) {
    padding: 8px 16px;
  }

  &:hover {
    background-color: #0a2a47;
  }
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

const PopupBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 1000px;
  text-align: center;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeInUp 0.5s ease-out forwards;
  max-height: 90vh;
  overflow-y: auto;

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
  color: #071c2f;
  margin-bottom: 15px;
  font-size: 1.25rem;

  @media (min-width: ${breakpoints.medium}) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
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

const PopupText = styled.text`
  font-size: 1.5px;
  fill: rgb(41, 57, 50);
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: central;

  @media (min-width: ${breakpoints.small}) {
    font-size: 2px;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #071c2f;

  &:hover {
    background-color: #4caf50;
  }
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

const AddPlayerForm = () => {
  const { t, i18n } = useTranslation();

  const [isRTL, setIsRTL] = useState(i18n.language === "ar");
  const navigate = useNavigate();
  const token = getAuthToken();

  const [currentStep, setCurrentStep] = useState(0);
  const [currentTC, setCurrentTC] = useState(0);
  const [tests, setTests] = useState([]);
  const [childId, setChildId] = useState(-1);
  const [err, setErr] = useState("");
  const [isEvaluatedSuccessfully, setIsEvaluatedSuccessfully] = useState(false);
  const [childScores, setChildScores] = useState([]);
  const [finalResult, setFinalResult] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [evaluateResponse, setEvaluateResponse] = useState(null);
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  const [categorizedScores, setCategorizedScores] = useState({
    largest: { num: -Infinity },
    largeMid: { num: -Infinity },
    smallMid: { num: Infinity },
    smallest: { num: Infinity },
  });

  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 9,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(
    today.getFullYear() - 6,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [formData, setFormData] = useState({
    Name: "",
    Gender: "",
    DateOfBirth: "",
    SchoolName: "",
    ClubName: "",
    IsAgreeDoctorApproval: false,
    IsNormalBloodTest: false,
    SportHistoryId: "",
    ParentSportHistoryId: "",
    SportPreferenceId: "",
    Height: "",
    Weight: "",
    FrontImage: "",
    SideImage: "",
    tests: [],
  });

  const testRanges = [
    {},
    {
      testName: t("addPlayer.testRanges.standingLongJump"),
      max: 140,
      min: 65,
      gif: StandingLongJumpTest,
    },
    {
      testName: t("addPlayer.testRanges.sitAndReach"),
      max: 10,
      min: 0,
      gif: SitandReachFlexibility,
    },
    {
      testName: t("addPlayer.testRanges.oneLegStand"),
      max: 10,
      min: 2.49,
      gif: OneLegStand,
    },
    {
      testName: t("addPlayer.testRanges.sitUpTest"),
      max: 22,
      min: 5.48,
      gif: SitUpTest30seconds,
    },
    {
      testName: t("addPlayer.testRanges.medicineBallPush"),
      max: 335,
      min: 125,
      gif: MedicineBallPush1kgFromStandingPosition,
    },
    {
      testName: t("addPlayer.testRanges.straightLineWalk"),
      max: 9,
      min: 3,
    },
    {
      testName: t("addPlayer.testRanges.sprint30m"),
      max: 10.295,
      min: 5.485,
    },
    {
      testName: t("addPlayer.testRanges.zigzag15m"),
      max: 9.6,
      min: 5.1,
    },
  ];

  const [errors, setErrors] = useState({});
  const [sports, setSports] = useState([]);

  const steps = [
    t("addPlayer.steps.personalInfo"),
    t("addPlayer.steps.medicalAgreement"),
    t("addPlayer.steps.sportHistory"),
    t("addPlayer.steps.physicalMeasurements"),
    t("addPlayer.steps.physicalTests"),
    t("addPlayer.steps.evaluate"),
  ];

  const testsCategories = [
    { name: t("addPlayer.testCategories.muscularStrength"), id: 100 },
    { name: t("addPlayer.testCategories.muscularEndurance"), id: 200 },
    { name: t("addPlayer.testCategories.balance"), id: 300 },
    { name: t("addPlayer.testCategories.speedAgility"), id: 400 },
  ];

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5155/api/Test/GetAllTests"
        );
        if (res.data.statusCode === 200) {
          setTests(res.data.data);
          setFormData((prev) => ({
            ...prev,
            tests: res.data.data.map((test) => ({
              TestId: test.id,
              TestResult: "",
              name: test.name,
            })),
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTests();
  }, [err]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5155/api/Sport/GetAllSports?categoryId=")
        .then((res) => {
          if (res.data.statusCode === 200) {
            setSports(res.data.data);
            console.log(res.data.data);
          } else if (res.data.statusCode === 400) {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const validateStep = () => {
    let valid = true;
    const newErrors = {};

    switch (currentStep) {
      case 0:
        if (!formData.Name) newErrors.Name = t("addPlayer.errors.name");
        if (!formData.Gender) newErrors.Gender = t("addPlayer.errors.gender");
        if (!formData.DateOfBirth)
          newErrors.DateOfBirth = t("addPlayer.errors.dob");
        if (!formData.SchoolName)
          newErrors.SchoolName = t("addPlayer.errors.school");
        break;
      case 1:
        if (!formData.IsAgreeDoctorApproval)
          newErrors.IsAgreeDoctorApproval = t(
            "addPlayer.errors.doctorApproval"
          );
        if (!formData.IsNormalBloodTest)
          newErrors.IsNormalBloodTest = t("addPlayer.errors.bloodTest");
        break;
      case 2:
        if (!formData.SportPreferenceId)
          newErrors.SportPreferenceId = t("addPlayer.errors.sportPreference");
        if (!formData.ParentSportHistoryId)
          newErrors.ParentSportHistoryId = t("addPlayer.errors.parentHistory");
        break;
      case 3:
        if (!formData.Height) newErrors.Height = t("addPlayer.errors.height");
        if (!formData.Weight) newErrors.Weight = t("addPlayer.errors.weight");
        if (!formData.FrontImage)
          newErrors.FrontImage = t("addPlayer.errors.frontImage");
        if (!formData.SideImage)
          newErrors.SideImage = t("addPlayer.errors.sideImage");
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "DateOfBirth") {
      const selectedDate = new Date(value);
      const today = new Date();

      let age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < selectedDate.getDate())
      ) {
        age--;
      }

      if (age >= 6 && age <= 9) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        setErrors((prev) => ({
          ...prev,
          DateOfBirth: null,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          DateOfBirth: t("addPlayer.errors.ageRange"),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileUpload = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [imageType]: file,
        [`${imageType}Name`]: file.name,
      }));
    }
  };

  const handleNext = async () => {
    if (
      currentStep === steps.length - 2 &&
      currentTC === testsCategories.length - 1
    ) {
      if (!validateStep()) return;

      const token = getAuthToken();
      const formDataToSend = new FormData();

      formData.tests.forEach((test, index) => {
        if (test.TestResult) {
          formDataToSend.append(
            `CreateChildTestDtos[${index}].TestId`,
            test.TestId
          );
          formDataToSend.append(
            `CreateChildTestDtos[${index}].TestResult`,
            test.TestResult
          );
        }
      });

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "tests" && value !== null && value !== undefined) {
          if (value instanceof File) {
            formDataToSend.append(key.toLowerCase(), value);
          } else {
            formDataToSend.append(key.toLowerCase(), value.toString());
          }
        }
      });

      try {
        const res = await axios.post(
          "http://localhost:5155/api/Child/CreateChild",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.statusCode === 201) {
          setChildId(res.data.data.childId);
          setCurrentStep((prev) => prev + 1);
          toast.success(t("addPlayer.results.success"));
        } else {
          toast.error(res.data.message);
          resetForm();
        }
      } catch (error) {
        toast.error(t("addPlayer.results.failed"));
        resetForm();
      }
      return;
    }

    if (currentStep === 4) {
      if (validateStep()) {
        setCurrentTC((prev) => {
          if (prev < testsCategories.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }
      return;
    }

    if (!validateStep()) return;
    if (currentStep < steps.length - 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const resetForm = () => {
    setFormData({
      Name: "",
      Gender: "",
      DateOfBirth: "",
      SchoolName: "",
      ClubName: "",
      IsAgreeDoctorApproval: false,
      IsNormalBloodTest: false,
      SportHistoryId: "",
      ParentSportHistoryId: "",
      SportPreferenceId: "",
      Height: "",
      Weight: "",
      FrontImage: "",
      SideImage: "",
      tests: [],
    });
    setCurrentStep(0);
    setCurrentTC(0);
  };

  const handlePrev = () => {
    if (currentStep === 4) {
      if (currentTC > 0) {
        setCurrentTC((prev) => prev - 1);
      } else {
        setCurrentStep((prev) => prev - 1);
      }
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTestChange = (index, value, min, max) => {
    const numValue = value === "" ? "" : Number(value);

    if (value !== "" && (numValue < min || numValue > max)) {
      setErrors((prev) => ({
        ...prev,
        [`test${index}`]: t("addPlayer.errors.testRange", { min, max }),
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`test${index}`];
        return newErrors;
      });

      setFormData((prev) => {
        const newTests = [...prev.tests];
        newTests[index] = { ...newTests[index], TestResult: value };
        return { ...prev, tests: newTests };
      });
    }
  };

  const handleEvaluateButton = async () => {
    if (!isEvaluatedSuccessfully) {
      try {
        const token = getAuthToken();
        const response = await axios.get(
          `http://localhost:5155/api/Child/EvaluteChildResult?childId=${childId}`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        if (response.data.statusCode === 200) {
          console.log(response.data);
          console.log(response.data.data);

          response.data.data !== null
            ? toast.success(response.data.data.finalResult)
            : toast.error(response.data.message);

          setIsEvaluatedSuccessfully(true);
          const childWithstrokeDasharray =
            response.data.data.childResultWithPercentagesDtos.map((child) => ({
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
          setFinalResult(response.data.data.finalResult);
          setShowPopup(true);
          setEvaluateResponse(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error(t("addPlayer.results.failed"));
      }
    } else {
      setShowPopup(true);
    }
  };

  return (
    <AppContainer $isRTL={isRTL}>
      <Navbar />
      <ToastContainer
        position={isRTL ? "top-left" : "top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={isRTL}
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
              let color = "black";

              if (percentage === categorizedScores.largest.num) {
                color = "rgb(18, 226, 28)";
              } else if (percentage === categorizedScores.largeMid.num) {
                color = "rgb(126, 138, 215)";
              } else if (percentage === categorizedScores.smallMid.num) {
                color = "rgb(219, 238, 16)";
              } else if (percentage === categorizedScores.smallest.num) {
                color = "rgb(199, 76, 76)";
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
          <CloseButton onClick={togglePopup} $isRTL={isRTL}>
            {t("addPlayer.buttons.close")}
          </CloseButton>
        </PopupBox>
      </Overlay>

      <MainContent>
        <Container>
          <FormSection>
            <FormTitle>{t("addPlayer.title")}</FormTitle>

            <ProgressContainer>
              {steps.map((step, index) => (
                <ProgressStep key={step}>
                  <ProgressNumber active={currentStep >= index}>
                    {index + 1}
                  </ProgressNumber>
                  <ProgressLabel active={currentStep >= index} $isRTL={isRTL}>
                    {step}
                  </ProgressLabel>
                  {index < steps.length - 1 && <ProgressConnector />}
                </ProgressStep>
              ))}
            </ProgressContainer>

            {/* Form Steps */}
            {currentStep === 0 && (
              <div>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.fullName")}</FormLabel>
                    <FormInput
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    />
                    {errors.Name && <ErrorText>{errors.Name}</ErrorText>}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.gender")}</FormLabel>
                    <FormSelect
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    >
                      <option value="">
                        {t("addPlayer.form.selectGender")}
                      </option>
                      <option value="Male">{t("addPlayer.form.male")}</option>
                      <option value="Female">
                        {t("addPlayer.form.female")}
                      </option>
                    </FormSelect>
                    {errors.Gender && <ErrorText>{errors.Gender}</ErrorText>}
                  </FormGroup>
                </FormGrid>

                <FormGrid>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.dob")}</FormLabel>
                    <FormInput
                      type="date"
                      name="DateOfBirth"
                      value={formData.DateOfBirth}
                      onChange={handleInputChange}
                      min={minDate}
                      max={maxDate}
                      $isRTL={isRTL}
                    />
                    {errors.DateOfBirth && (
                      <ErrorText>{errors.DateOfBirth}</ErrorText>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.schoolName")}</FormLabel>
                    <FormInput
                      name="SchoolName"
                      value={formData.SchoolName}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    />
                    {errors.SchoolName && (
                      <ErrorText>{errors.SchoolName}</ErrorText>
                    )}
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <FormLabel>{t("addPlayer.form.clubName")}</FormLabel>
                  <FormInput
                    name="ClubName"
                    value={formData.ClubName}
                    onChange={handleInputChange}
                    $isRTL={isRTL}
                  />
                </FormGroup>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                {i18n.language == "en" && (
                  <FormCheckboxContainer $isRTL={i18n.language == "ar"}>
                    <FormCheckbox
                      type="checkbox"
                      name="IsAgreeDoctorApproval"
                      checked={formData.IsAgreeDoctorApproval}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    />
                    <FormLabel>{t("addPlayer.form.doctorApproval")}</FormLabel>
                    {errors.IsAgreeDoctorApproval && (
                      <ErrorText>{errors.IsAgreeDoctorApproval}</ErrorText>
                    )}
                  </FormCheckboxContainer>
                )}
                {i18n.language == "ar" && (
                  <FormCheckboxContainer $isRTL={i18n.language == "en"}>
                    <FormCheckbox
                      type="checkbox"
                      name="IsAgreeDoctorApproval"
                      checked={formData.IsAgreeDoctorApproval}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    />
                    <FormLabel>{t("addPlayer.form.doctorApproval")}</FormLabel>
                    {errors.IsAgreeDoctorApproval && (
                      <ErrorText>{errors.IsAgreeDoctorApproval}</ErrorText>
                    )}
                  </FormCheckboxContainer>
                )}

                {i18n.language == "ar" && (
                  <FormCheckboxContainer $isRTL={i18n.language == "en"}>
                    <FormCheckbox
                      type="checkbox"
                      name="IsNormalBloodTest"
                      checked={formData.IsNormalBloodTest}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    />
                    <FormLabel>{t("addPlayer.form.bloodTest")}</FormLabel>
                    {errors.IsNormalBloodTest && (
                      <ErrorText>{errors.IsNormalBloodTest}</ErrorText>
                    )}
                  </FormCheckboxContainer>
                )}
                {i18n.language == "en" && (
                  <FormCheckboxContainer $isRTL={i18n.language == "ar"}>
                    <FormCheckbox
                      type="checkbox"
                      name="IsNormalBloodTest"
                      checked={formData.IsNormalBloodTest}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    />
                    <FormLabel>{t("addPlayer.form.bloodTest")}</FormLabel>
                    {errors.IsNormalBloodTest && (
                      <ErrorText>{errors.IsNormalBloodTest}</ErrorText>
                    )}
                  </FormCheckboxContainer>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.sportPreference")}</FormLabel>
                    <FormSelect
                      name="SportPreferenceId"
                      value={formData.SportPreferenceId}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    >
                      <option value="">
                        {t("addPlayer.form.selectSportPreference")}
                      </option>
                      {sports.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {i18n.language == "en"
                            ? sport.name
                            : sport.arabicName}
                        </option>
                      ))}
                    </FormSelect>
                    {errors.SportPreferenceId && (
                      <ErrorText>{errors.SportPreferenceId}</ErrorText>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>
                      {t("addPlayer.form.parentSportHistory")}
                    </FormLabel>
                    <FormSelect
                      name="ParentSportHistoryId"
                      value={formData.ParentSportHistoryId}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    >
                      <option value="">
                        {t("addPlayer.form.selectParentHistory")}
                      </option>
                      {sports.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {i18n.language == "en"
                            ? sport.name
                            : sport.arabicName}
                        </option>
                      ))}
                    </FormSelect>
                    {errors.ParentSportHistoryId && (
                      <ErrorText>{errors.ParentSportHistoryId}</ErrorText>
                    )}
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <FormLabel>{t("addPlayer.form.sportHistory")}</FormLabel>
                  <FormSelect
                    name="SportHistoryId"
                    value={formData.SportHistoryId}
                    onChange={handleInputChange}
                    $isRTL={isRTL}
                  >
                    <option value="">
                      {t("addPlayer.form.selectSportHistory")}
                    </option>
                    {sports.map((sport) => (
                      <option key={sport.id} value={sport.id}>
                        {i18n.language == "en" ? sport.name : sport.arabicName}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.height")}</FormLabel>
                    <FormInput
                      type="number"
                      step="0.1"
                      name="Height"
                      value={formData.Height}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    />
                    {errors.Height && <ErrorText>{errors.Height}</ErrorText>}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.weight")}</FormLabel>
                    <FormInput
                      type="number"
                      step="0.1"
                      name="Weight"
                      value={formData.Weight}
                      onChange={handleInputChange}
                      $isRTL={isRTL}
                    />
                    {errors.Weight && <ErrorText>{errors.Weight}</ErrorText>}
                  </FormGroup>
                </FormGrid>
                <FormGrid>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.frontImage")}</FormLabel>
                    <FormInput
                      type="file"
                      onChange={(e) => handleFileUpload(e, "FrontImage")}
                      $isRTL={isRTL}
                    />
                    {errors.FrontImage && (
                      <ErrorText>{errors.FrontImage}</ErrorText>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t("addPlayer.form.sideImage")}</FormLabel>
                    <FormInput
                      type="file"
                      onChange={(e) => handleFileUpload(e, "SideImage")}
                      $isRTL={isRTL}
                    />
                    {errors.SideImage && (
                      <ErrorText>{errors.SideImage}</ErrorText>
                    )}
                  </FormGroup>
                </FormGrid>
              </div>
            )}

            {currentStep === 4 && (
              <>
                <ProgressContainer>
                  {testsCategories.map((tc, index) => (
                    <ProgressStep key={tc.name}>
                      <ProgressNumber active={currentTC >= index}>
                        {index + 1}
                      </ProgressNumber>
                      <ProgressLabel active={currentTC >= index} $isRTL={isRTL}>
                        {tc.name}
                      </ProgressLabel>
                      {index < testsCategories.length - 1 && (
                        <ProgressConnector />
                      )}
                    </ProgressStep>
                  ))}
                </ProgressContainer>

                <div>
                  {formData.tests.map((test, index) => {
                    if (
                      currentStep === steps.length - 2 &&
                      currentTC < testsCategories.length &&
                      testsCategories[currentTC].id ===
                        tests.find((t) => t.id === test.TestId)?.categoryId
                    ) {
                      return (
                        <FormGroup key={test.TestId}>
                          <FormLabel>
                            {tests.find((t) => t.id === test.TestId)?.id}{" "}
                            {tests.find((t) => t.id === test.TestId)?.name} *
                          </FormLabel>
                          <TestDescription $isRTL={isRTL}>
                            {
                              tests.find((t) => t.id === test.TestId)
                                ?.description
                            }
                          </TestDescription>
                          {testRanges[test.TestId]?.gif && (
                            <div>
                              <TestImage
                                src={testRanges[test.TestId].gif}
                                alt="Test demonstration"
                              />
                              <TestDescription $isRTL={isRTL}>
                                {t("addPlayer.form.howToTest")}
                              </TestDescription>
                            </div>
                          )}
                          <FormInput
                            type="number"
                            value={test.TestResult}
                            onChange={(e) =>
                              handleTestChange(
                                index,
                                e.target.value,
                                testRanges[test.TestId]?.min,
                                testRanges[test.TestId]?.max
                              )
                            }
                            min={testRanges[test.TestId]?.min}
                            max={testRanges[test.TestId]?.max}
                            step="any"
                            $isRTL={isRTL}
                          />
                          {errors[`test${index}`] && (
                            <ErrorText>{errors[`test${index}`]}</ErrorText>
                          )}
                        </FormGroup>
                      );
                    }
                    return null;
                  })}
                </div>
              </>
            )}

            {currentStep === 5 && (
              <EvaluateButton onClick={handleEvaluateButton} $isRTL={isRTL}>
                {t("addPlayer.form.evaluateButton")}
              </EvaluateButton>
            )}

            {i18n.language === "en" &&
              <>
                <NavigationButtons $isRTL={isRTL}>
                  {currentStep > 0 && currentStep !== 5 && (
                    <Button onClick={handlePrev} $isRTL={isRTL}>
                      {!isRTL ? <FaArrowLeft /> : null}
                      {t("addPlayer.buttons.previous")}
                      {isRTL ? <FaArrowRight /> : null}
                    </Button>
                  )}
                  {currentStep !== 5 && (
                    <>
                      <Button onClick={handleNext} $isRTL={isRTL}>
                        {isRTL ? <FaArrowLeft /> : null}
                        {currentStep === steps.length - 2 &&
                        currentTC === testsCategories.length - 1
                          ? t("addPlayer.buttons.submit")
                          : t("addPlayer.buttons.next")}
                        {!isRTL ? <FaArrowRight /> : null}
                      </Button>
                    </>
                  )}
                </NavigationButtons>
              </>
            }
            {i18n.language === "ar" &&
              <>
                <NavigationButtons $isRTL={isRTL}>
                  
                  {currentStep !== 5 && (
                    <>
                      <Button onClick={handleNext} $isRTL={isRTL}>
                        {isRTL ? <FaArrowLeft /> : null}
                        {currentStep === steps.length - 2 &&
                        currentTC === testsCategories.length - 1
                          ? t("addPlayer.buttons.submit")
                          : t("addPlayer.buttons.next")}
                        {!isRTL ? <FaArrowRight /> : null}
                      </Button>
                    </>
                  )}
                  {currentStep > 0 && currentStep !== 5 && (
                    <Button onClick={handlePrev} $isRTL={isRTL}>
                      {!isRTL ? <FaArrowLeft /> : null}
                      {t("addPlayer.buttons.previous")}
                      {isRTL ? <FaArrowRight /> : null}
                    </Button>
                  )}
                </NavigationButtons>
              </>
            }
          </FormSection>
        </Container>
      </MainContent>
    </AppContainer>
  );
};

export default AddPlayerForm;
