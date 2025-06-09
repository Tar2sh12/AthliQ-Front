import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuthToken } from "../../services/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  FaUsers,
  FaCheck,
  FaTimes,
  FaSearch,
  FaUserClock,
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

const PendingUsersTable = styled.div`
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

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => (props.accept ? "#4CAF50" : "#F44336")};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.accept ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)"};
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
    to {
      transform: rotate(360deg);
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.status === "pending"
      ? "rgba(255, 193, 7, 0.2)"
      : props.status === "approved"
      ? "rgba(76, 175, 80, 0.2)"
      : "rgba(244, 67, 54, 0.2)"};
  color: ${(props) =>
    props.status === "pending"
      ? "#FFC107"
      : props.status === "approved"
      ? "#4CAF50"
      : "#F44336"};
`;

const UserRegistrationAdmin = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [processingIds, setProcessingIds] = useState([]);
  const { t, i18n } = useTranslation();
  const token = getAuthToken();
  const [totalPending, setTotalPending] = useState(0);
  const [totalApprovedToday, setTotalApprovedToday] = useState(0);

  // Check if current language is Arabic
  const isArabic = i18n.language === "ar";
  const fetchPendingUsers = async () => {
    try {
      // Simulating API call with mock data
    //   console.log(token.token);
      axios
        .get("http://localhost:5155/api/Admin/GetAllStats", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((response) => {
        //   console.log(response.data);
          setTotalApprovedToday(response.data.data.numberOfUsersApprovedToday);
          setTotalPending(response.data.data.numberOfPendingUsers);
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get("http://localhost:5155/api/Admin/GetAllUsers", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
          params: {
            pageIndex: 1,
            pageSize: 6,
          },
        })
        .then((response) => {
        //   console.log(response.data);
          if (response.data.statusCode === 200) {
            const data = response.data.data.getAllUserDtos.map((user) => ({
              id: user.id,
              name: user.fullName,
              email: user.email,
              registrationDate: user.createdAt,
              status: user.isAccepted ? "approved" : "pending",
              role: user.role,
            }));

            setPendingUsers(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      setError(t("adminAcceptUsers.admin.errors.fetchFailed"));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPendingUsers();
  }, [t]);

  const handleApprove = async (userId) => {
    try {
    //   console.log(userId);
      const token = getAuthToken();

      // send userid in query
      await axios
        .put("http://localhost:5155/api/Admin/AcceptUser", null, {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
          params: {
            userId: userId,
          },
        })
        .then((response) => {
        //   console.log(response);
          fetchPendingUsers();
        })
        .catch((error) => {
          console.error("API error:", error.response?.data || error.message);
        });

      //   setProcessingIds((prev) => [...prev, userId]);
      //   // Simulate API call
      //   await new Promise((resolve) => setTimeout(resolve, 800));

      //   setPendingUsers((prev) =>
      //     prev.map((user) =>
      //       user.id === userId ? { ...user, status: "approved" } : user
      //     )
      //   );
      //   setProcessingIds((prev) => prev.filter((id) => id !== userId));
    } catch (err) {
      setError(t("adminAcceptUsers.admin.errors.approveFailed", { userId }));
      //   setProcessingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleReject = async (userId) => {
    // console.log(userId); 
    
    try {
      const token = getAuthToken();

      // send userid in query
      await axios
        .put("http://localhost:5155/api/Admin/RejectUser", null, {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
          params: {
            userId: userId,
          },
        })
        .then((response) => {
        //   console.log(response);
          fetchPendingUsers();
        })
        .catch((error) => {
          console.error("API error:", error.response?.data || error.message);
        });
    } catch (err) {
      setError(t("adminAcceptUsers.admin.errors.rejectFailed", { userId }));
    //   setProcessingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  // Filter users based on search term
  const filteredUsers = pendingUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div
          style={{
            background: "rgba(255, 65, 108, 0.2)",
            padding: "1.5rem",
            borderRadius: "10px",
            textAlign: "center",
            border: "1px solid rgba(255, 65, 108, 0.5)",
          }}
        >
          <h2>{error}</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container style={{ direction: isArabic ? "rtl" : "ltr" }}>
      <Header>
        <Title>
          <FaUserClock /> {t("adminAcceptUsers.admin.title")}
        </Title>
        {/* <SearchContainer>
          <input
            type="text"
            placeholder={t("adminAcceptUsers.admin.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
        </SearchContainer> */}
      </Header>

      {/* Stats */}
      <StatsContainer>
        <StatCard>
          <StatTitle>
            <FaUsers /> {t("adminAcceptUsers.admin.stats.totalPending")}
          </StatTitle>
          <StatValue>{totalPending}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>
            <FaCheck /> {t("adminAcceptUsers.admin.stats.approvedToday")}
          </StatTitle>
          <StatValue>{totalApprovedToday}</StatValue>
        </StatCard>
        {/* <StatCard>
          <StatTitle>
            <FaTimes /> {t("adminAcceptUsers.admin.stats.rejectedToday")}
          </StatTitle>
          <StatValue>0</StatValue>
        </StatCard> */}
      </StatsContainer>

      {/* Pending Users Table */}
      <PendingUsersTable>
        <Title>
          <FaUsers /> {t("adminAcceptUsers.admin.table.title")}
        </Title>
        <div style={{ overflowX: "auto" }}>
          <Table>
            <thead>
              <tr>
                <TableHeader>
                  {t("adminAcceptUsers.admin.table.headers.name")}
                </TableHeader>
                <TableHeader>
                  {t("adminAcceptUsers.admin.table.headers.email")}
                </TableHeader>
                <TableHeader>
                  {t("adminAcceptUsers.admin.table.headers.role")}
                </TableHeader>
                <TableHeader>
                  {t("adminAcceptUsers.admin.table.headers.regDate")}
                </TableHeader>
                <TableHeader>
                  {t("adminAcceptUsers.admin.table.headers.status")}
                </TableHeader>
                <TableHeader>
                  {t("adminAcceptUsers.admin.table.headers.actions")}
                </TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={user.status}>
                      {t(`adminAcceptUsers.admin.table.status.${user.status}`)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <ActionButton
                        accept
                        onClick={() => handleApprove(user.id)}
                        disabled={
                          user.status !== "pending" ||
                          processingIds.includes(user.id)
                        }
                      >
                        <FaCheck />
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleReject(user.id)}
                        disabled={
                          user.status == "pending" ||
                          processingIds.includes(user.id)
                        }
                      >
                        <FaTimes />
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      </PendingUsersTable>
    </Container>
  );
};

export default UserRegistrationAdmin;
