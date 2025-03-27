import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Header from "../../components/header";
import { getAuthToken } from "../../services/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

//test gifs
import SitandReachFlexibility from "../../assets/tests-gif/Sit-and-Reach-Flexibility.gif";
import MedicineBallPush1kgFromStandingPosition from "../../assets/tests-gif/Medicine Ball Push (1 kg) from Standing Position.gif"
import OneLegStand from "../../assets/tests-gif/One-Leg-Stand.png"
import StandingLongJumpTest from "../../assets/tests-gif/Standing-Long-Jump-Test.webp"
import SitUpTest30seconds from "../../assets/tests-gif/Sit-up Test (30 seconds).jpg"

const AddPlayerForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTC, setCurrentTC] = useState(0);
  const [tests, setTests] = useState([]);
  const [childId, setChildId] = useState(-1);
  const [err, setErr] = useState("");
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
    { testName: "Standing Long Jump Test (in cm)", max: 140, min: 65 , gif:StandingLongJumpTest},
    { testName: "Sit-and-Reach Flexibility (in cm)", max: 10, min: 0 , gif:SitandReachFlexibility},
    { testName: "One-Leg Stand (30 seconds)", max: 10, min: 2.49 , gif:OneLegStand},
    { testName: "Sit-up Test (30 seconds)", max: 22, min: 5.48 , gif:SitUpTest30seconds},
    {
      testName: "Medicine Ball Push (1 kg) from Standing Position",
      max: 335,
      min: 125,
      gif:MedicineBallPush1kgFromStandingPosition
    },
    { testName: "Straight-Line Walking (3 meters)", max: 9, min: 3 },
    { testName: "30-Meter Sprint (in seconds)", max: 10.295, min: 5.485 },
    { testName: "15-Meter Zigzag Run (in seconds)", max: 9.6, min: 5.1 },
  ];

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5155/api/Test/GetAllTests"
        );
        if (res.data.statusCode === 200) {
          console.log(res.data.data);

          setTests(res.data.data);
          // Initialize formData.tests here after fetching
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
  const [errors, setErrors] = useState({});
  // Add sports state at the top of your component
  const [sports, setSports] = useState([]);

  // Modify your useEffect for fetching sports
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5155/api/Sport/GetAllSports?categoryId=")
        .then((res) => {
          if (res.data.statusCode === 200) {
            setSports(res.data.data); // Store sports data in state
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

  const steps = [
    "Personal Info",
    "Medical & Agreement",
    "Sport History",
    "Physical Measurements",
    "Physical Tests",
    "Evaluate",
  ];

  const testsCategories = [
    { name: "Muscular Strength Tests", id: 100 },
    { name: "Muscular Endurance Tests", id: 200 },
    { name: "Balance Tests", id: 300 },
    { name: "Speed and Agility Tests", id: 400 },
  ];

  const validateStep = () => {
    let valid = true;
    if (valid === true) {
      console.log("valid");
    }
    var newErrors = {};
    var CopyErrors = {};
    switch (currentStep) {
      case 0:
        if (!formData.Name) newErrors.Name = "Name is required";
        if (!formData.Gender) newErrors.Gender = "Gender is required";
        if (!formData.DateOfBirth)
          newErrors.DateOfBirth = "Date of Birth is required";
        if (!formData.SchoolName)
          newErrors.SchoolName = "School Name is required";
        break;
      case 1:
        if (!formData.IsAgreeDoctorApproval)
          newErrors.IsAgreeDoctorApproval = "Doctor approval is required";
        if (!formData.IsNormalBloodTest)
          newErrors.IsNormalBloodTest = "Blood test confirmation is required";
        break;
      case 2:
        if (!formData.SportPreferenceId)
          newErrors.SportPreferenceId = "Sport preference is required";
        if (!formData.ParentSportHistoryId)
          newErrors.ParentSportHistoryId = "Parent sport history is required";
        break;
      case 3:
        if (!formData.Height) newErrors.Height = "Height is required";
        if (!formData.Weight) newErrors.Weight = "Weight is required";
        if (!formData.FrontImage)
          newErrors.FrontImage = "Front image is required";
        if (!formData.SideImage) newErrors.SideImage = "Back image is required";
        break;
      case 4:
        var counter = 0;
        formData.tests.forEach((test, index) => {
          if (!test.TestResult) {
            CopyErrors[`test${index}`] = "Test result is required";
            counter++;
          }
        });
        if (counter % 2 === 0) {
          errors.length = 0;
          valid = true;
        } else {
          newErrors = CopyErrors;
          valid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update handleFileUpload to store File objects
  const handleFileUpload = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [imageType]: file, // Store File object directly
        [`${imageType}Name`]: file.name,
      }));
    }
  };

  // Modified submission handler in handleNext
  const handleNext = async () => {
    if (
      currentStep === steps.length - 2 &&
      currentTC === testsCategories.length - 1
    ) {
      console.log({ message: "hello", valid: validateStep() });

      const token = getAuthToken();
      const formDataToSend = new FormData();
      // Append tests
      formData.tests.forEach((test, index) => {
        if (test.TestResult)
          formDataToSend.append(
            `CreateChildTestDtos[${index}].TestId`,
            test.TestId
          );
        formDataToSend.append(
          `CreateChildTestDtos[${index}].TestResult`,
          test.TestResult
        );
      });

      // Append all form fields
      formDataToSend.append("Name", formData.Name);
      formDataToSend.append("Gender", formData.Gender);
      formDataToSend.append("dateOfBirth", formData.DateOfBirth);
      formDataToSend.append("schoolName", formData.SchoolName);
      formDataToSend.append("clubName", formData.ClubName);
      formDataToSend.append(
        "isAgreeDoctorApproval",
        formData.IsAgreeDoctorApproval.toString()
      );
      formDataToSend.append(
        "isNormalBloodTest",
        formData.IsNormalBloodTest.toString()
      );
      formDataToSend.append("sportHistoryId", formData.SportHistoryId);
      formDataToSend.append(
        "parentSportHistoryId",
        formData.ParentSportHistoryId
      );
      formDataToSend.append("sportPreferenceId", formData.SportPreferenceId);
      formDataToSend.append("height", formData.Height);
      formDataToSend.append("weight", formData.Weight);

      // Append files if they exist
      if (formData.FrontImage instanceof File) {
        formDataToSend.append("frontImage", formData.FrontImage);
      }
      if (formData.SideImage instanceof File) {
        formDataToSend.append("sideImage", formData.SideImage);
      }
      console.log(formData, token.token);

      await axios
        .post("http://localhost:5155/api/Child/CreateChild", formDataToSend, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 201) {
            console.log(res.data.data);

            setChildId(res.data.data.childId);
            console.log({ childId });
            setCurrentStep((prev) => prev + 1);
            toast.success("Player added successfully");
          } else {
            toast.error(res.data.message);
            setErr(res.data.message);
            console.error(res.data.message);
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
          }
        })
        .catch((error) => {
          console.log(error);

          toast.error("Failed to add player");
          setErr(error);
          console.error(error);
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
        });
    }
    if (currentStep === 4) {
      console.log(validateStep(), errors);

      if (validateStep()) {
        setCurrentTC((prev) => {
          if (prev < testsCategories.length - 1) {
            return prev + 1;
          }
        });
      }

      console.log(currentTC, currentStep);

      return;
    }
    if (!validateStep()) return;
    if (currentStep < steps.length - 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep === 4) {
      if (currentTC > 0) {
        setCurrentTC((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
        });
      } else {
        setCurrentStep((prev) => prev - 1);
      }
    } else if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };
  const handleTestChange = (index, value, min, max) => {
    console.log(index, value, min, max);

    setFormData((prev) => {
      const newTests = [...prev.tests];
      newTests[index] = { ...newTests[index], TestResult: value };
      return { ...prev, tests: newTests };
    });
  };

  const handleEvaluateButton = async () => {
    console.log(childId);
    try {
      const token = getAuthToken();

      await axios
        .get(
          `http://localhost:5155/api/Child/EvaluteChildResult?childId=${childId}`,
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 200) {
            console.log(response);
            if (response.data.message === "Retreived Result succesfully") {
              toast.success(`${FormData.name}'s result evaluated successfully`);

              navigate("/allchildren");
            } else {
              toast.error(response.data.message);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div class="min-h-screen flex flex-col">
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <main class="flex-grow">
          <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
            {/* Header and background same as before */}

            <main className="container mx-auto py-5 px-4">
              <section className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  Add New Player
                </h2>

                {/* Progress Indicator */}
                <div className="flex justify-center mb-8">
                  {steps.map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${
                    currentStep >= index
                      ? "bg-green-600 text-white"
                      : "bg-gray-300"
                  }`}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={`ml-2 ${
                          currentStep >= index ? "font-bold" : "text-gray-500"
                        }`}
                      >
                        {step}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-16 h-1 bg-gray-300 mx-2"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Form Steps */}
                <div className="form-steps">
                  {/* Step 1: Personal Info */}
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            name="Name"
                            value={formData.Name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                          />
                          {errors.Name && (
                            <span className="text-red-500 text-sm">
                              {errors.Name}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Gender *
                          </label>
                          <select
                            name="Gender"
                            value={formData.Gender}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {errors.Gender && (
                            <span className="text-red-500 text-sm">
                              {errors.Gender}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Date of Birth *
                          </label>
                          <input
                            type="date"
                            name="DateOfBirth"
                            value={formData.DateOfBirth}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                          />
                          {errors.DateOfBirth && (
                            <span className="text-red-500 text-sm">
                              {errors.DateOfBirth}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">
                            School Name *
                          </label>
                          <input
                            name="SchoolName"
                            value={formData.SchoolName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                          />
                          {errors.SchoolName && (
                            <span className="text-red-500 text-sm">
                              {errors.SchoolName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Club Name
                        </label>
                        <input
                          name="ClubName"
                          value={formData.ClubName}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Medical & Agreement */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="IsAgreeDoctorApproval"
                            checked={formData.IsAgreeDoctorApproval}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <label>I agree to provide doctor's approval *</label>
                          {errors.IsAgreeDoctorApproval && (
                            <span className="text-red-500 text-sm ml-2">
                              {errors.IsAgreeDoctorApproval}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="IsNormalBloodTest"
                            checked={formData.IsNormalBloodTest}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <label>Normal blood test results *</label>
                          {errors.IsNormalBloodTest && (
                            <span className="text-red-500 text-sm ml-2">
                              {errors.IsNormalBloodTest}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Sport History */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Sport Preference *
                          </label>
                          <select
                            name="SportPreferenceId"
                            value={formData.SportPreferenceId}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="">Select Sport Preference</option>
                            {sports.map((sport) => (
                              <option key={sport.id} value={sport.id}>
                                {sport.name}
                              </option>
                            ))}
                          </select>
                          {errors.SportPreferenceId && (
                            <span className="text-red-500 text-sm">
                              {errors.SportPreferenceId}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Parent Sport History *
                          </label>
                          <select
                            name="ParentSportHistoryId"
                            value={formData.ParentSportHistoryId}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="">
                              Select Parent Sport History
                            </option>
                            {sports.map((sport) => (
                              <option key={sport.id} value={sport.id}>
                                {sport.name}
                              </option>
                            ))}
                          </select>
                          {errors.ParentSportHistoryId && (
                            <span className="text-red-500 text-sm">
                              {errors.ParentSportHistoryId}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Optional Sport History ID */}
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Sport History (optional)
                        </label>
                        <select
                          name="SportHistoryId"
                          value={formData.SportHistoryId}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="">
                            Select Sport History (Optional)
                          </option>
                          {sports.map((sport) => (
                            <option key={sport.id} value={sport.id}>
                              {sport.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Physical Measurements */}
                  {currentStep === 3 && (
                    <>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-2">
                              Height (cm) *
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              name="Height"
                              value={formData.Height}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-lg"
                            />
                            {errors.Height && (
                              <span className="text-red-500 text-sm">
                                {errors.Height}
                              </span>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-2">
                              Weight (kg) *
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              name="Weight"
                              value={formData.Weight}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-lg"
                            />
                            {errors.Weight && (
                              <span className="text-red-500 text-sm">
                                {errors.Weight}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-2">
                              Front Image
                            </label>
                            <input
                              type="file"
                              onChange={(e) =>
                                handleFileUpload(e, "FrontImage")
                              }
                              className="w-full p-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-2">
                              Side Image
                            </label>
                            <input
                              type="file"
                              onChange={(e) => handleFileUpload(e, "SideImage")}
                              className="w-full p-2 border rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                      <div className="flex justify-center mb-8">
                        {testsCategories.map((tc, index) => (
                          <div key={tc.name} className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${
                    currentTC >= index
                      ? "bg-green-600 text-white"
                      : "bg-gray-300"
                  }`}
                            >
                              {index + 1}
                            </div>
                            <div
                              className={`ml-2 ${
                                currentTC >= index
                                  ? "font-bold"
                                  : "text-gray-500"
                              }`}
                            >
                              {tc.name}
                            </div>
                            {index < testsCategories.length - 1 && (
                              <div className="w-16 h-1 bg-gray-300 mx-2"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {formData.tests.map(
                          (
                            test,
                            index // Use formData.tests instead of tests
                          ) => {
                            if (
                              currentStep === steps.length - 2 &&
                              currentTC < testsCategories.length &&
                              testsCategories[currentTC].id ===
                                tests.find((t) => t.id === test.TestId)
                                  ?.categoryId
                            ) {
                              return (
                                <>
                               
                                  <div key={test.TestId} className="mb-4">
                                    {" "}
                                    <label className="block text-gray-700 mb-2">
                                      {
                                        tests.find((t) => t.id === test.TestId)
                                          ?.id
                                      }{" "}
                                      {
                                        tests.find((t) => t.id === test.TestId)
                                          ?.name
                                      }{" "}
                                      *
                                    </label>
                                    <p className="text-sm text-gray-500 mb-2">
                                      {
                                        tests.find((t) => t.id === test.TestId)
                                          ?.description
                                      }
                                    </p>
                                    {(testRanges[test.TestId].gif!==undefined && testRanges[test.TestId].gif!==null)&&
                                    <div className="flex items-center space-x-4">
                                      <div className="w-1/2">
                                        <img
                                          src={testRanges[test.TestId].gif}
                                          alt="Sit-Ups"
                                          className="w-48 h-32 rounded-lg shadow"
                                        />
                                        <p className="text-sm text-gray-600 mt-2">
                                          How to do the test correctly.
                                        </p>
                                      </div>
                                    </div>}
                                    <input
                                      type="number"
                                      value={test.TestResult}
                                      max={testRanges[test.TestId].max}
                                      min={testRanges[test.TestId].min}
                                      onChange={(e) =>
                                        handleTestChange(
                                          index,
                                          e.target.value,
                                          testRanges[test.TestId].min,
                                          testRanges[test.TestId].max
                                        )
                                      }
                                      className="w-full p-2 border rounded-lg"
                                    />
                                    {errors[`test${index}`] && (
                                      <span className="text-red-500 text-sm">
                                        {errors[`test${index}`]}
                                      </span>
                                    )}
                                  </div>
                                </>
                              );
                            }
                          }
                        )}
                      </div>
                    </>
                  )}

                  {currentStep === 5 && (
                    <>
                      <button
                        onClick={handleEvaluateButton}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-300"
                      >
                        <i className="fas fa-medal"></i> Evaluate
                      </button>
                    </>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep === 0 || currentStep === 5 ? null : (
                    <button
                      onClick={handlePrev}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <FaArrowLeft className="inline mr-2" />
                      Previous
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    {currentStep === steps.length - 2 &&
                    currentTC === testsCategories.length - 1
                      ? "Submit"
                      : "Next"}
                    <FaArrowRight className="inline ml-2" />
                  </button>
                </div>
              </section>
            </main>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AddPlayerForm;
