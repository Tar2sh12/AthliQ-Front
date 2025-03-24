import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../../services/auth";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            },
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.statusCode === 200) {
              setPlayers(response.data.value.data.children);
              //console.log(response.data.value.data.totalCount);

              setTotalPages(Math.ceil(response.data.value.data.totalCount / 6));
            }
          });

        //setTotalPages(Math.ceil(response.data.value.data.totalCount / 6));
        // console.log(response.data.value.data.totalCount );

        setLoading(false);
      } catch (err) {
        console.log(err);

        setError("Failed to fetch players");
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [currentPage]);

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

  const handleEvaluateButton = async (child) => {
    try {
      const token = getAuthToken();

      await axios
        .get(
          `http://localhost:5155/api/Child/EvaluteChildResult?childId=${child.id}`,
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
              toast.success(`${child.name}'s result evaluated successfully`);
            }
            else{
              toast.error(response.data.message);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map((player) => (
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
