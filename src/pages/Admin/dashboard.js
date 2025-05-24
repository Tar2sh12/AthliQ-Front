import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuthToken } from '../../services/auth';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { 
  FaUsers, FaChild, FaChartPie, FaChartBar, FaVenus, FaMars, 
  FaRunning, FaDumbbell, FaClock, FaBalanceScale, FaSearch 
} from 'react-icons/fa';
import { Doughnut, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// Enhanced Styled Components with better responsive behavior
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #4b9fe1, #6a11cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  
  @media (max-width: 992px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  input {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    min-width: 250px;
    
    @media (max-width: 576px) {
      width: 100%;
      min-width: auto;
    }
  }
  
  button {
    background: linear-gradient(to right, #4b6cb7, #182848);
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StatTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b9fe1;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 576px) {
    gap: 1rem;
  }
`;

const ChartCard = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ChartTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

const RecentUsersTable = styled.div`
margin-top: 20px;
  background: linear-gradient(135deg, #1a2a6c 0%, #0a1128 100%);
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #4b9fe1;
  font-weight: 600;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background: rgba(75, 159, 225, 0.1);
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
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
    to { transform: rotate(360deg); }
  }
`;

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const token = getAuthToken();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    setInnerWidth(window.innerWidth);

  }, [window.innerWidth]);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulating API call with mock data
        setTimeout(() => {
          setDashboardData({
            "totalUsers": 125,
            "totalChildren": 342,
            "maleChildren": 192,
            "femaleChildren": 150,
            "muscularStrength": 85,
            "muscularEndurance": 72,
            "balance": 63,
            "speedAgility": 92,
            "otherCategory": 30,
            "ageDistribution": [
              {"age": "5-7", "count": 45},
              {"age": "8-10", "count": 112},
              {"age": "11-13", "count": 98},
              {"age": "14-16", "count": 87}
            ],
            "recentUsers": [
              {"name": "John Doe", "email": "john@example.com", "childrenCount": 2, "lastActive": "2023-07-15T10:30:00"},
              {"name": "Jane Smith", "email": "jane@example.com", "childrenCount": 1, "lastActive": "2023-07-16T14:45:00"},
              {"name": "Bob Johnson", "email": "bob@example.com", "childrenCount": 3, "lastActive": "2023-07-17T09:15:00"},
              {"name": "Emily Davis", "email": "emily@example.com", "childrenCount": 2, "lastActive": "2023-07-18T16:20:00"},
              {"name": "Michael Brown", "email": "michael@example.com", "childrenCount": 1, "lastActive": "2023-07-19T11:55:00"}
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </Container>
    );
  }

  if (!dashboardData) {
    return (
      <Container>
        <div style={{ 
          background: 'rgba(255, 65, 108, 0.2)', 
          padding: '1.5rem', 
          borderRadius: '10px', 
          textAlign: 'center',
          border: '1px solid rgba(255, 65, 108, 0.5)'
        }}>
          <h2>No data available</h2>
        </div>
      </Container>
    );
  }

  // Filter recent users based on search term
  const filteredUsers = dashboardData.recentUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gender distribution data for chart
  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [dashboardData.maleChildren, dashboardData.femaleChildren],
      backgroundColor: ['#4b9fe1', '#e14ba3'],
      borderColor: ['#fff', '#fff'],
      borderWidth: 1
    }]
  };

  // Category distribution data for chart
  const categoryData = {
    labels: ['Muscular Strength', 'Muscular Endurance', 'Balance', 'Speed Agility', 'Other'],
    datasets: [{
      data: [
        dashboardData.muscularStrength,
        dashboardData.muscularEndurance,
        dashboardData.balance,
        dashboardData.speedAgility,
        dashboardData.otherCategory
      ],
      backgroundColor: [
        '#4b9fe1',
        '#00b09b',
        '#6a11cb',
        '#ff414c',
        '#f9c74f'
      ],
      borderColor: '#fff',
      borderWidth: 1
    }]
  };

  // Age distribution data for bar chart
  const ageData = {
    labels: dashboardData.ageDistribution.map(item => item.age),
    datasets: [{
      label: 'Number of Children',
      data: dashboardData.ageDistribution.map(item => item.count),
      backgroundColor: '#4b9fe1',
      borderColor: '#fff',
      borderWidth: 1
    }]
  };

  return (
    <Container>
      <Header>
        <Title>
          <FaChartPie /> Admin Dashboard
        </Title>
        <SearchContainer>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </SearchContainer>
      </Header>

      {/* Quick Stats */}
      <StatsContainer>
        <StatCard>
          <StatTitle><FaUsers /> Total Users</StatTitle>
          <StatValue>{dashboardData.totalUsers}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle><FaChild /> Total Children</StatTitle>
          <StatValue>{dashboardData.totalChildren}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle><FaVenus /> Female Children</StatTitle>
          <StatValue>{dashboardData.femaleChildren}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle><FaMars /> Male Children</StatTitle>
          <StatValue>{dashboardData.maleChildren}</StatValue>
        </StatCard>
      </StatsContainer>

      {/* Charts */}
 {/* Charts */}
<ChartsContainer>
  <ChartCard>
    <ChartTitle><FaVenus /> Gender Distribution</ChartTitle>
    <div style={{ position: 'relative', height: '300px' }}>
      <Doughnut 
        data={genderData} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: 'white',
                padding: 20,
                font: {
                  size: window.innerWidth < 768 ? 10 : 12
                }
              }
            }
          },
          cutout: window.innerWidth < 768 ? '60%' : '75%',
          radius: innerWidth < 768 ? '90%' : '100%'
        }} 
      />
    </div>
  </ChartCard>
  <ChartCard>
    <ChartTitle><FaRunning /> Recommended Categories</ChartTitle>
    <div style={{ position: 'relative', height: '300px' }}>
      <Doughnut 
        data={categoryData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: 'white',
                padding: 20,
                font: {
                  size: innerWidth < 768 ? 10 : 12
                }
              }
            }
          },
          cutout: innerWidth < 768 ? '60%' : '75%',
          radius: innerWidth < 768 ? '90%' : '100%'
        }} 
      />
    </div>
  </ChartCard>
</ChartsContainer>

      {/* Age Distribution Bar Chart */}
      <ChartCard style={{ gridColumn: innerWidth < 400 ? '1 / -1' : '' }}>
        <ChartTitle><FaChild /> Age Distribution</ChartTitle>
        <div style={{ height: '300px' }}>
          <Bar 
            data={ageData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: 'white',
                    font: {
                      size: innerWidth < 768 ? 12 : 14
                    }
                  }
                }
              },
              scales: {
                y: {
                  ticks: {
                    color: 'white',
                    font: {
                      size: innerWidth < 768 ? 12 : 14
                    }
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                },
                x: {
                  ticks: {
                    color: 'white',
                    font: {
                      size: innerWidth < 768 ? 12 : 14
                    }
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                }
              }
            }} 
          />
        </div>
      </ChartCard>

      {/* Recent Users */}
      <RecentUsersTable>
        <ChartTitle><FaUsers /> Recent Users</ChartTitle>
        <div style={{ overflowX: 'auto' }}>
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Children</TableHeader>
                <TableHeader>Last Active</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.childrenCount}</TableCell>
                  <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      </RecentUsersTable>
    </Container>
  );
};

export default AdminDashboard;