import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaTags,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaSave,
  FaSearch,
} from "react-icons/fa";
import { getAuthToken } from "../../services/auth";

// Styled components (keeping the same theme)
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

const CategoriesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  gap: "1.5rem",
  marginBottom: "2rem",
};

const CategoryCard = {
  background: "linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%)",
  borderRadius: "15px",
  padding: "1.5rem",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease",
  position: "relative",
};

const CategoryHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "1rem",
};

const CategoryTitle = {
  fontSize: "1.3rem",
  fontWeight: "600",
  color: "#4b9fe1",
  margin: "0",
};

const CategorySubtitle = {
  fontSize: "1.1rem",
  color: "rgba(255, 255, 255, 0.8)",
  margin: "0.25rem 0 0 0",
};

const CategoryDescription = {
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "0.9rem",
  lineHeight: "1.5",
  marginBottom: "1.5rem",
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

const TextArea = {
  ...Input,
  resize: "vertical",
  minHeight: "80px",
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
const ReadMore = ({ text, maxLength = 150 }) => {
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

const CategoryManagement = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  
  const [categories, setCategories] = useState([]);
  
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add, edit, view
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    arabicName: "",
    description: "",
    descriptionAr: ""
  });
const token = getAuthToken();

    const fetchCategories = async () => {
    try {
      const token = getAuthToken();
      
      // Fetch stats from your API
      const response = await axios.get("http://localhost:5155/api/Category/GetAllCategories");

      if (response.data.statusCode === 200) {
        // console.log(response.data);
        
        setCategories(response.data.data || []);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter categories based on search term
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.arabicName.includes(searchTerm) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.descriptionAr.includes(searchTerm)
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleAddCategory = () => {
    setModalMode("add");
    setFormData({ name: "", arabicName: "", description: "", descriptionAr: "" });
    // console.log(formData);
    
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      arabicName: category.arabicName,
      description: category.description,
      descriptionAr: category.descriptionAr
    });
    setShowModal(true);
  };

  const handleViewCategory = (category) => {
    setModalMode("view");
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      arabicName: category.arabicName,
      description: category.description,
      descriptionAr: category.descriptionAr
    });
    setShowModal(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      try {
        // API call: DELETE /api/Category/DeleteCategory?id=${categoryId}
        await axios.delete(`http://localhost:5155/api/Category/DeleteCategory?id=${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        }).then((response) => {
            console.log(response.data);
            
          fetchCategories();
        }).catch((error) => {
          console.error(error);
        })
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveCategory = async () => {
    setLoading(true);
    try {
      if (modalMode === "add") {
        // API call: POST /api/Category/CreateCategory
        await axios.post("http://localhost:5155/api/Category/CreateCategory", formData, {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        }).then((response) => {
          fetchCategories();
        }).catch((error) => {
          console.error(error);
        })

      } else if (modalMode === "edit") {
        // API call: PUT /api/Category/UpdateCategory
        await axios.put("http://localhost:5155/api/Category/UpdateCategory", {...formData, id: selectedCategory.id}, {
          headers: {
            Authorization: `Bearer ${token.token}`
          }
        }).then((response) => {
            console.log(response);
            
          fetchCategories();
        }).catch((error) => {
          console.error(error);
        })
    
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ ...Container, direction: isArabic ? "rtl" : "ltr" }}>
      <div style={Header}>
        <h1 style={Title}>Category Management</h1>
        <p style={Subtitle}>Manage all categories and organize your content</p>
      </div>

      <div style={ActionBar}>

        <button
          style={AddButton}
          onClick={handleAddCategory}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(75, 159, 225, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          <FaPlus /> Add Category
        </button>
      </div>

       <div style={CategoriesGrid}>
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            style={CategoryCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(75, 159, 225, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
            }}
          >
                        <div style={CategoryHeader}>
              <div>
                <h3 style={CategoryTitle}>{category.name}</h3>
                <h4 style={CategorySubtitle}>{category.arabicName}</h4>
              </div>
              <div style={ActionButtons}>
                <button
                  style={ActionButton}
                  onClick={() => handleViewCategory(category)}
                  onMouseEnter={(e) => e.target.style.background = "rgba(75, 159, 225, 0.2)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                  title="View"
                >
                  <FaEye />
                </button>
                <button
                  style={ActionButton}
                  onClick={() => handleEditCategory(category)}
                  onMouseEnter={(e) => e.target.style.background = "rgba(255, 193, 7, 0.2)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  style={ActionButton}
                  onClick={() => handleDeleteCategory(category.id)}
                  onMouseEnter={(e) => e.target.style.background = "rgba(220, 53, 69, 0.2)"}
                  onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div style={CategoryDescription}>
              <strong>English:</strong> <ReadMore text={category.description} />
            </div>
            <div style={CategoryDescription}>
              <strong>Arabic:</strong> <ReadMore text={category.descriptionAr} />
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255, 255, 255, 0.5)" }}>
          <FaTags size={48} style={{ marginBottom: "1rem" }} />
          <p style={{ fontSize: "1.2rem" }}>No categories found</p>
          <p>Try adjusting your search or add a new category</p>
        </div>
      )}

      {showModal && (
        <div style={Modal}>
          <div style={ModalContent}>
            <div style={ModalHeader}>
              <h2 style={ModalTitle}>
                {modalMode === "add" && "Add New Category"}
                {modalMode === "edit" && "Edit Category"}
                {modalMode === "view" && "Category Details"}
              </h2>
              <button style={CloseButton} onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div style={FormGroup}>
              <label style={Label}>English Name</label>
              <input
                style={Input}
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = "#4b9fe1"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"}
              />
            </div>

            <div style={FormGroup}>
              <label style={Label}>Arabic Name</label>
              <input
                style={Input}
                type="text"
                value={formData.arabicName}
                onChange={(e) => handleInputChange("arabicName", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = "#4b9fe1"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"}
              />
            </div>

            <div style={FormGroup}>
              <label style={Label}>English Description</label>
              <textarea
                style={TextArea}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = "#4b9fe1"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"}
              />
            </div>

            <div style={FormGroup}>
              <label style={Label}>Arabic Description</label>
              <textarea
                style={TextArea}
                value={formData.descriptionAr}
                onChange={(e) => handleInputChange("descriptionAr", e.target.value)}
                disabled={modalMode === "view"}
                onFocus={(e) => e.target.style.borderColor = "#4b9fe1"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"}
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
                  onClick={handleSaveCategory}
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

export default CategoryManagement;