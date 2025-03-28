import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../../services/auth";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import styled from "styled-components";
const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50;
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
`;

const PopupBox = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  width: 320px;
  text-align: center;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeInUp 0.5s ease-out forwards;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
  color: #444;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: green;
  color: #fff;
  &:hover {
    background-color: #4caf50;
  }
`;

const CloseButton = styled(SubmitButton)`
  margin-top: 12px;
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Svg = styled.svg`
  display: block;
  max-width: 80%;
  max-height: 100px;
  position: relative;
`;

const Circle = styled.path`
  stroke: #4CC790;
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

const Circle2 = styled.path`
  stroke:rgb(189, 199, 76);
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
const Circle3 = styled.path`
  stroke:rgb(199, 76, 76);
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

const Text = styled.text`
  font-size: 6px;
  fill: #4CC790;
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: central;
`;
const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
        console.log(token.token);
        
        setLoading(true);

        await axios
          .get(`http://localhost:5155/api/Child/ViewAllChildren`, {
            params: {
              pageSize: 6,
              pageIndex: currentPage,
              search: debouncedSearchTerm, // Add search parameter
            },
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          })
          .then((response) => {
            if (response.data.statusCode === 200) {
              //console.log(response);

              const data = response.data.value?.data || response.data.data;
              console.log(data);

              setPlayers(data.children);
              if (searchTerm === "") {
                setTotalPages(Math.ceil(data.totalCount / 6));
              } else {
                setTotalPages(Math.ceil(data.children.length / 6));
              }
            } else {
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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // const handleEvaluateButton = async (child) => {
  //   try {
  //     const token = getAuthToken();

  //     await axios
  //       .get(
  //         `http://localhost:5155/api/Child/EvaluteChildResult?childId=${child.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token.token}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         if (response.data.statusCode === 200) {
  //           console.log(response);
  //           if (response.data.message === "Retreived Result succesfully") {
  //             toast.success(`${child.name}'s result evaluated successfully`);
  //           }
  //           else{
  //             toast.error(response.data.message);
  //           }
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Add search input JSX
  const searchBar = (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search players by name..."
        className="w-full p-2 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );

  if (loading) {
    return (
      <>
        <Header />
        <main class="flex-grow">
          <div className="container mx-auto py-8 px-4">
            <section className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Players List
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center mt-8">Loading...</div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </>
    );
  }
  if (error === "Failed to fetch players") {
    return (
      <>
        <Header />
        <main class="flex-grow">
          <div className="container mx-auto py-8 px-4">
            <section className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Players List
              </h2>
              {searchBar}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center mt-8 text-red-600">{error}</div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
    <Button onClick={togglePopup}>Open Popup Form</Button>
      <Overlay show={showPopup}>
        <PopupBox>
          <h2 style={{ color: "green" }}>Popup Form</h2>
          <Form>
          <Container>
                        <Svg viewBox="0 0 36 36">
                          <Circle3
                            strokeDasharray="60, 100"
                            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <Text x="18" y="18">
                            60%
                          </Text>
                        </Svg>
                        <Svg viewBox="0 0 36 36">
                          <Circle2
                            strokeDasharray="75, 100"
                            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <Text x="18" y="18">
                            75%
                          </Text>
                        </Svg>
                        <Svg viewBox="0 0 36 36">
                          <Circle
                            strokeDasharray="90.9, 100"
                            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <Text x="18" y="18">
                            90%
                          </Text>
                        </Svg>
                      </Container>
            <Label htmlFor="name">Username:</Label>
            <Input type="text" placeholder="Enter Your Username" id="name" name="name" required />
            <Label htmlFor="email">Email:</Label>
            <Input type="email" placeholder="Enter Your Email" id="email" name="email" required />
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
          <CloseButton onClick={togglePopup}>Close</CloseButton>
        </PopupBox>
      </Overlay>
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
          <div className="container mx-auto py-8 px-4">
            <section className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Players List
              </h2>
              {searchBar}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map((player) => (
                  <>
                    <div
                      key={player.id}
                      className="bg-green-100 p-4 rounded-lg shadow"
                    >
                      <h3 className="text-lg font-semibold text-green-700">
                        {player.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        gender: {player.gender}
                      </p>
                      <p className="text-sm text-gray-600">
                        Date of Birth: {player.dateOfBirth}
                      </p>

                      {player.category == null ? (
                        <p className="text-sm text-red-600">
                          Category: Not Selected
                        </p>
                      ) : (
                        <p className="text-sm text-blue-600">
                          Category: {player.category}
                        </p>
                      )}
                      
                      {/* <div className="mt-4 flex justify-end">
                      <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-300">
                        <i className="fas fa-edit"></i> Edit
                      </button>
                    </div> */}
                    </div>
                  </>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Previous
                </button>
                <span className="text-gray-700 self-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlayersList;
