import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaClipboardList,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaSave,
  FaSearch,
  FaExclamationTriangle,
} from "react-icons/fa";
import { getAuthToken } from "../../services/auth";

// Mock auth token (replace with your actual auth service)

// Styled components (keeping the same theme as CategoryManagement)
const Container = {
  background: "#0a1128",
  minHeight: "100vh",
  padding: "4rem 2rem 2rem",
  color: "white",
};

const Header = {
  marginTop: "20px",
  marginBottom: "3rem",
  textAlign: "center",
};

const Title = {
  fontSize: "3rem",
  background: "linear-gradient(135deg, #4b9fe1, #6a11cb)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: "0 0 1rem 0",
};

const Subtitle = {
  fontSize: "1.2rem",
  color: "rgba(255, 255, 255, 0.7)",
  margin: "0",
};

const ActionBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  gap: "1rem",
  flexWrap: "wrap",
};

const SearchBox = {
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%)",
  borderRadius: "10px",
  padding: "0.75rem 1rem",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  flex: "1",
  maxWidth: "300px",
};

const SearchInput = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "1rem",
  marginLeft: "0.5rem",
  outline: "none",
  width: "100%",
};

const AddButton = {
  background: "linear-gradient(135deg, #4b9fe1, #6a11cb)",
  border: "none",
  borderRadius: "10px",
  padding: "0.75rem 1.5rem",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  transition: "all 0.3s ease",
};

const TestsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  gap: "1.5rem",
  marginBottom: "2rem",
};

const TestCard = {
  background: "linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%)",
  borderRadius: "15px",
  padding: "1.5rem",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease",
  position: "relative",
};

const TestHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "1rem",
};

const TestTitle = {
  fontSize: "1.3rem",
  fontWeight: "600",
  color: "#4b9fe1",
  margin: "0",
};

const TestSubtitle = {
  fontSize: "1.1rem",
  color: "rgba(255, 255, 255, 0.8)",
  margin: "0.25rem 0 0 0",
};

const TestDescription = {
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "0.9rem",
  lineHeight: "1.5",
  marginBottom: "1rem",
};

const CategoryBadge = {
  background: "rgba(75, 159, 225, 0.2)",
  border: "1px solid rgba(75, 159, 225, 0.4)",
  borderRadius: "12px",
  padding: "0.25rem 0.75rem",
  fontSize: "0.8rem",
  color: "#4b9fe1",
  display: "inline-block",
  marginBottom: "1rem",
};

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

const Modal = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  background: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1000",
  padding: "1rem",
};

const ModalContent = {
  background: "linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%)",
  borderRadius: "15px",
  padding: "2rem",
  width: "100%",
  maxWidth: "500px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  maxHeight: "90vh",
  overflowY: "auto",
};

const ModalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.5rem",
};

const ModalTitle = {
  fontSize: "1.5rem",
  color: "#4b9fe1",
  margin: "0",
};

const CloseButton = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "1.2rem",
  cursor: "pointer",
};

const FormGroup = {
  marginBottom: "1.5rem",
};

const Label = {
  display: "block",
  color: "white",
  fontSize: "1rem",
  marginBottom: "0.5rem",
  fontWeight: "500",
};

const Input = {
  width: "100%",
  padding: "0.75rem",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "8px",
  color: "white",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const InputError = {
  ...Input,
  borderColor: "#dc3545",
  boxShadow: "0 0 0 0.2rem rgba(220, 53, 69, 0.25)",
};

const Select = {
  ...Input,
  cursor: "pointer",
};

const SelectError = {
  ...InputError,
  cursor: "pointer",
};

const TextArea = {
  ...Input,
  resize: "vertical",
  minHeight: "80px",
};

const TextAreaError = {
  ...InputError,
  resize: "vertical",
  minHeight: "80px",
};

const ErrorMessage = {
  color: "#dc3545",
  fontSize: "0.875rem",
  marginTop: "0.25rem",
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
};

const ErrorSummary = {
  background: "rgba(220, 53, 69, 0.1)",
  border: "1px solid rgba(220, 53, 69, 0.3)",
  borderRadius: "8px",
  padding: "1rem",
  marginBottom: "1.5rem",
  color: "#dc3545",
};

const ButtonGroup = {
  display: "flex",
  gap: "1rem",
  justifyContent: "flex-end",
  marginTop: "2rem",
};

const Button = {
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const PrimaryButton = {
  ...Button,
  background: "linear-gradient(135deg, #4b9fe1, #6a11cb)",
  color: "white",
};

const PrimaryButtonDisabled = {
  ...PrimaryButton,
  background: "rgba(75, 159, 225, 0.3)",
  cursor: "not-allowed",
};

const SecondaryButton = {
  ...Button,
  background: "transparent",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "white",
};

const LoadingSpinner = {
  width: "20px",
  height: "20px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "50%",
  borderTopColor: "white",
  animation: "spin 1s linear infinite",
};

// ReadMore component
const ReadMore = ({ text, maxLength = 50 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text) return null;
  
  if (text.length <= maxLength || isExpanded) {
    return (
      <div>
        {text}
        {text.length > maxLength && (
          <button 
            onClick={() => setIsExpanded(false)}
            style={{
              background: "none",
              border: "none",
              color: "#4b9fe1",
              cursor: "pointer",
              marginLeft: "0.5rem",
              fontSize: "0.8rem"
            }}
          >
            Read Less
          </button>
        )}
      </div>
    );
  }
  
  const truncatedText = text.substring(0, maxLength) + "...";
  
  return (
    <div>
      {truncatedText}
      <button 
        onClick={() => setIsExpanded(true)}
        style={{
          background: "none",
          border: "none",
          color: "#4b9fe1",
          cursor: "pointer",
          marginLeft: "0.5rem",
          fontSize: "0.8rem"
        }}
      >
        Read More
      </button>
    </div>
  );
};

const TestManagement = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  
  const [tests, setTests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add, edit, view
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    arabicName: "",
    description: "",
    descriptionAr: "",
    categoryId: 0
  });
  const token = getAuthToken();

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Required field validations
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "English name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "English name must be at least 2 characters long";
    }
    
    if (!formData.arabicName || formData.arabicName.trim() === "") {
      errors.arabicName = "Arabic name is required";
    } else if (formData.arabicName.trim().length < 2) {
      errors.arabicName = "Arabic name must be at least 2 characters long";
    }
    
    if (!formData.description || formData.description.trim() === "") {
      errors.description = "English description is required";
    } else if (formData.description.trim().length < 10) {
      errors.description = "English description must be at least 10 characters long";
    }
    
    if (!formData.descriptionAr || formData.descriptionAr.trim() === "") {
      errors.descriptionAr = "Arabic description is required";
    } else if (formData.descriptionAr.trim().length < 10) {
      errors.descriptionAr = "Arabic description must be at least 10 characters long";
    }
    
    // Category validation
    if (!formData.categoryId || formData.categoryId === 0) {
      errors.categoryId = "Please select a category";
    } else {
      // Check if the selected category exists in the categories list
      const categoryExists = categories.some(cat => cat.id === formData.categoryId);
      if (!categoryExists) {
        errors.categoryId = "Selected category is not valid";
      }
    }
    
    // Check for duplicate names (excluding current test in edit mode)
    const duplicateNameTest = tests.find(test => 
      test.name.toLowerCase().trim() === formData.name.toLowerCase().trim() &&
      (modalMode === "add" || test.id !== selectedTest?.id)
    );
    if (duplicateNameTest) {
      errors.name = "A test with this English name already exists";
    }
    
    const duplicateArabicNameTest = tests.find(test => 
      test.arabicName.trim() === formData.arabicName.trim() &&
      (modalMode === "add" || test.id !== selectedTest?.id)
    );
    if (duplicateArabicNameTest) {
      errors.arabicName = "A test with this Arabic name already exists";
    }
    
    return errors;
  };

  // Clear validation errors when form data changes
  const clearFieldError = (field) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Mock API calls (replace with actual API calls)
  const fetchTests = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
       await axios.get("http://localhost:5155/api/Test/GetAllTests").then(response => {
        if (response.data.statusCode === 200) {
          setTests(response.data.data);
          setLoading(false);
        }
       }).catch(error => {
        console.error(error);
        setLoading(false);
      })
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tests:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Mock data - replace with actual API call
      await axios.get("http://localhost:5155/api/Category/GetAllCategories").then(response => {
        if (response.data.statusCode === 200) {
            console.log(response.data);
            
          setCategories(response.data.data || []);
        }
      }).catch(error => {
        console.error(error);
      })
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchTests();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter tests based on search term
    const filtered = tests.filter(test =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.arabicName.includes(searchTerm) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.descriptionAr.includes(searchTerm) ||
      test.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTests(filtered);
  }, [searchTerm, tests]);

  const handleAddTest = () => {
    setModalMode("add");
    setFormData({ 
      name: "", 
      arabicName: "", 
      description: "", 
      descriptionAr: "", 
      categoryId: 0 
    });
    setValidationErrors({});
    setShowModal(true);
  };

  const handleEditTest = (test) => {
    setModalMode("edit");
    setSelectedTest(test);
    setFormData({
      name: test.name,
      arabicName: test.arabicName,
      description: test.description,
      descriptionAr: test.descriptionAr,
      categoryId: test.categoryId
    });
    setValidationErrors({});
    setShowModal(true);
  };

  const handleViewTest = (test) => {
    setModalMode("view");
    setSelectedTest(test);
    setFormData({
      name: test.name,
      arabicName: test.arabicName,
      description: test.description,
      descriptionAr: test.descriptionAr,
      categoryId: test.categoryId
    });
    setValidationErrors({});
    setShowModal(true);
  };

  const handleDeleteTest = async (testId) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      setLoading(true);
      try {
        // API call: DELETE /api/Test/DeleteTest?id=${testId}
        await axios.delete(`http://localhost:5155/api/Test/DeleteTest?id=${testId}`, {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        });
        
        fetchTests();
      } catch (error) {
        console.error("Error deleting test:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveTest = async () => {
    // Validate form before submitting
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return; // Don't submit if there are validation errors
    }
    
    setLoading(true);
    try {
      // Prepare data with trimmed strings
      const trimmedData = {
        name: formData.name.trim(),
        arabicName: formData.arabicName.trim(),
        description: formData.description.trim(),
        descriptionAr: formData.descriptionAr.trim(),
        categoryId: formData.categoryId
      };
      
      if (modalMode === "add") {
        // API call: POST /api/Test/CreateTest
        await axios.post("http://localhost:5155/api/Test/CreateTest", trimmedData, {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        });
        
        fetchTests();
        
      } else if (modalMode === "edit") {
        // API call: PUT /api/Test/UpdateTest
        await axios.put("http://localhost:5155/api/Test/UpdateTest", 
          { ...trimmedData, id: selectedTest.id }, {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        });
        
        fetchTests();
      }
      setShowModal(false);
      setValidationErrors({});
    } catch (error) {
      console.error("Error saving test:", error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === "categoryId" ? parseInt(value) : value 
    }));
    // Clear validation error for this field when user starts typing
    clearFieldError(field);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setValidationErrors({});
  };

  // Check if form has validation errors
  const hasValidationErrors = Object.keys(validationErrors).length > 0;

  return (
    <div style={{ ...Container, direction: isArabic ? "rtl" : "ltr" }}>
      <div style={Header}>
        <h1 style={Title}>Test Management</h1>
        <p style={Subtitle}>Manage all tests and organize your fitness assessments</p>
      </div>

      <div style={ActionBar}>
        <button
          style={AddButton}
          onClick={handleAddTest}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(75, 159, 225, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          <FaPlus /> Add Test
        </button>
      </div>

      <div style={TestsGrid}>
        {filteredTests.map((test) => (
          <div
            key={test.id}
            style={TestCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(75, 159, 225, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
            }}
          >
            <div style={TestHeader}>
              <div>
                <h3 style={TestTitle}>{test.name}</h3>
                <h4 style={TestSubtitle}>{test.arabicName}</h4>
                {/* <h4 style={CategoryBadge}>{categories.find(cat => cat.id === test.categoryId)?.name || "No category assigned"}</h4> */}
              </div>
              <div style={ActionButtons}>
                <button
                  style={ActionButton}
                  onClick={() => handleViewTest(test)}
                  onMouseEnter={(e) => e.target.style.background = "rgba(75, 159, 225, 0.2)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                  title="View"
                >
                  <FaEye />
                </button>
                <button
                  style={ActionButton}
                  onClick={() => handleEditTest(test)}
                  onMouseEnter={(e) => e.target.style.background = "rgba(255, 193, 7, 0.2)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  style={ActionButton}
                  onClick={() => handleDeleteTest(test.id)}
                  onMouseEnter={(e) => e.target.style.background = "rgba(220, 53, 69, 0.2)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <div style={CategoryBadge}>
              {categories.find(cat => cat.id === test.categoryId)?.name || "No category assigned"}
            </div>
            
            <div style={TestDescription}>
              <strong>English:</strong> <ReadMore text={test.description} />
            </div>
            <div style={TestDescription}>
              <strong>Arabic:</strong> <ReadMore text={test.descriptionAr} />
            </div>
          </div>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255, 255, 255, 0.5)" }}>
          <FaClipboardList size={48} style={{ marginBottom: "1rem" }} />
          <p style={{ fontSize: "1.2rem" }}>No tests found</p>
          <p>Try adjusting your search or add a new test</p>
        </div>
      )}

      {showModal && (
        <div style={Modal}>
          <div style={ModalContent}>
            <div style={ModalHeader}>
              <h2 style={ModalTitle}>
                {modalMode === "add" && "Add New Test"}
                {modalMode === "edit" && "Edit Test"}
                {modalMode === "view" && "Test Details"}
              </h2>
              <button style={CloseButton} onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            {hasValidationErrors && modalMode !== "view" && (
              <div style={ErrorSummary}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <FaExclamationTriangle />
                  <strong>Please fix the following errors:</strong>
                </div>
                <ul style={{ margin: "0", paddingLeft: "1.5rem" }}>
                  {Object.values(validationErrors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={FormGroup}>
              <label style={Label}>English Name *</label>
              <input
                style={validationErrors.name ? InputError : Input}
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = validationErrors.name ? "#dc3545" : "#4b9fe1"}
                onBlur={(e) => e.target.style.borderColor = validationErrors.name ? "#dc3545" : "rgba(255, 255, 255, 0.2)"}
                placeholder="Enter test name in English"
              />
              {validationErrors.name && (
                <div style={ErrorMessage}>
                  <FaExclamationTriangle size={12} />
                  {validationErrors.name}
                </div>
              )}
            </div>

            <div style={FormGroup}>
              <label style={Label}>Arabic Name *</label>
              <input
                style={validationErrors.arabicName ? InputError : Input}
                type="text"
                value={formData.arabicName}
                onChange={(e) => handleInputChange("arabicName", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = validationErrors.arabicName ? "#dc3545" : "#4b9fe1"}
                onBlur={(e) => e.target.style.borderColor = validationErrors.arabicName ? "#dc3545" : "rgba(255, 255, 255, 0.2)"}
                placeholder="أدخل اسم الاختبار بالعربية"
              />
              {validationErrors.arabicName && (
                <div style={ErrorMessage}>
                  <FaExclamationTriangle size={12} />
                  {validationErrors.arabicName}
                </div>
              )}
            </div>

            <div style={FormGroup}>
              <label style={Label}>Category *</label>
              <select
                style={validationErrors.categoryId ? SelectError : Select}
                value={formData.categoryId}
                onChange={(e) => handleInputChange("categoryId", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = validationErrors.categoryId ? "#dc3545" : "#4b9fe1"}
                onBlur={(e) => e.target.style.borderColor = validationErrors.categoryId ? "#dc3545" : "rgba(255, 255, 255, 0.2)"}
              >
                <option value={0}>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id} style={{ color: "black" }}>
                    {category.name} - {category.arabicName}
                  </option>
                ))}
              </select>
              {validationErrors.categoryId && (
                <div style={ErrorMessage}>
                  <FaExclamationTriangle size={12} />
                  {validationErrors.categoryId}
                </div>
              )}
            </div>

            <div style={FormGroup}>
              <label style={Label}>English Description *</label>
              <textarea
                style={validationErrors.description ? TextAreaError : TextArea}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = validationErrors.description ? "#dc3545" : "#4b9fe1"}
                onBlur={(e) => e.target.style.borderColor = validationErrors.description ? "#dc3545" : "rgba(255, 255, 255, 0.2)"}
                placeholder="Enter test description in English (minimum 10 characters)"
                rows={3}
              />
              {validationErrors.description && (
                <div style={ErrorMessage}>
                  <FaExclamationTriangle size={12} />
                  {validationErrors.description}
                </div>
              )}
            </div>

            <div style={FormGroup}>
              <label style={Label}>Arabic Description *</label>
              <textarea
                style={validationErrors.descriptionAr ? TextAreaError : TextArea}
                value={formData.descriptionAr}
                onChange={(e) => handleInputChange("descriptionAr", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = validationErrors.descriptionAr ? "#dc3545" : "#4b9fe1"}
                 onBlur={(e) => e.target.style.borderColor = validationErrors.description ? "#dc3545" : "rgba(255, 255, 255, 0.2)"}
                placeholder="Enter test description in Arabic (minimum 10 characters)"
                rows={3}
              />
            </div>

            {modalMode !== "view" && (
              <div style={ButtonGroup}>
                <button
                  style={SecondaryButton}
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  style={PrimaryButton}
                  onClick={handleSaveTest}
                  disabled={loading}
                >
                  {loading ? (
                    <div style={LoadingSpinner}></div>
                  ) : (
                    <>
                      <FaSave /> {modalMode === "add" ? "Create" : "Update"}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default TestManagement;