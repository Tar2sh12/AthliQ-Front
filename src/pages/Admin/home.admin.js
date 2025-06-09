import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../services/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  FaTags,
  FaFootballBall,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaArrowRight,
} from "react-icons/fa";

const Container = styled.div`
  background: #0a1128;
  min-height: 100vh;
  padding: 4rem 2rem 2rem;
  color: white;

  @media (max-width: 992px) {
    padding: 3.5rem 1.75rem 1.75rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem 1.5rem;
  }

  @media (max-width: 576px) {
    padding: 2.5rem 1rem 1rem;
  }
`;

const Header = styled.div`
  margin-top: 20px;
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  background: linear-gradient(135deg, #4b9fe1, #6a11cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 1rem 0;

  @media (max-width: 992px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const DashboardCard = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(75, 159, 225, 0.2);
    border-color: rgba(75, 159, 225, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4b9fe1, #6a11cb);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4b9fe1, #6a11cb);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  color: white;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardStats = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #4b9fe1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ArrowIcon = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  transition: all 0.3s ease;

  ${DashboardCard}:hover & {
    color: #4b9fe1;
    transform: translateX(5px);
  }
`;

const StatsOverview = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const StatsTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #4b9fe1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(75, 159, 225, 0.3);
  border-radius: 50%;
  border-top-color: #4b9fe1;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const AdminDashboardHome = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalSports: 0,
    totalTests: 0,
    pendingUsers: 0,
  });

  // Check if current language is Arabic
  const isArabic = i18n.language === "ar";

  const fetchDashboardStats = async () => {
    try {
      const token = getAuthToken();
      
      // Fetch stats from your API
      const response = await axios.get("http://localhost:5155/api/Admin/GetAllStats", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (response.data.statusCode === 200) {
        console.log(response.data);
        
        setStats({
          totalCategories: response.data.data.numberOfCategories || 0,
          totalSports: response.data.data.numberOfSports || 0,
          totalTests: response.data.data.numberOfTests || 0,
          pendingUsers: response.data.data.numberOfPendingUsers || 0,
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const dashboardItems = [
    {
      title: "Categories",
      description: "Manage all categories and organize your content efficiently",
      icon: <FaTags />,
      route: "/admin/categories",
      stats: `${stats.totalCategories} Categories`,
    },
    {
      title: "Sports",
      description: "Add, edit, and organize sports activities and events",
      icon: <FaFootballBall />,
      route: "/admin/sports",
      stats: `${stats.totalSports} Sports`,
    },
    {
      title: "Tests",
      description: "Create and manage tests, quizzes, and assessments",
      icon: <FaClipboardList />,
      route: "/admin/tests",
      stats: `${stats.totalTests} Tests`,
    },
    {
      title: "User Management",
      description: "Accept or reject user registrations and manage accounts",
      icon: <FaUsers />,
      route: "/admin/acceptOrRejectUsers",
      stats: `${stats.pendingUsers} Pending`,
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container style={{ direction: isArabic ? "rtl" : "ltr" }}>
      <Header>
        <Title>Admin Dashboard</Title>
        <Subtitle>Welcome back! Manage your platform from here.</Subtitle>
      </Header>

      <DashboardGrid>
        {dashboardItems.map((item, index) => (
          <DashboardCard
            key={index}
            onClick={() => handleCardClick(item.route)}
          >
            <CardIcon>{item.icon}</CardIcon>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <CardFooter>
              <CardStats>{item.stats}</CardStats>
              <ArrowIcon>
                <FaArrowRight />
              </ArrowIcon>
            </CardFooter>
          </DashboardCard>
        ))}
      </DashboardGrid>

      <StatsOverview>
        <StatsTitle>
          <FaChartBar /> Quick Overview
        </StatsTitle>
        <StatsGrid>
          <StatItem>
            <StatNumber>{stats.totalCategories}</StatNumber>
            <StatLabel>Total Categories</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.totalSports}</StatNumber>
            <StatLabel>Total Sports</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.totalTests}</StatNumber>
            <StatLabel>Total Tests</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.pendingUsers}</StatNumber>
            <StatLabel>Pending Users</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsOverview>
    </Container>
  );
};

export default AdminDashboardHome;