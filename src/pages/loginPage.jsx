import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { getAuthToken, setAuthToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url("https://res.cloudinary.com/djsgalfjn/image/upload/v1739915591/istockphoto-1163705459-612x612_n0mrwz.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const Overlay = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    gender: "Male",
    phoneNumber: "",
  });

  useEffect(() => {
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    tailwindScript.async = true;
    document.head.appendChild(tailwindScript);

    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.rel = "stylesheet";
    fontAwesomeLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
    document.head.appendChild(fontAwesomeLink);

    return () => {
      document.head.removeChild(tailwindScript);
      document.head.removeChild(fontAwesomeLink);
    };
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    console.log({
      key: e.target.name,
      value: e.target.value,
    });

    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleOnClictRegisterButton = (e) => {
    e.preventDefault(); // Prevent page reload

    console.log("Register button clicked!");

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(registerData.password)) {
      toast.error("Password must be at least 8 characters, include one uppercase letter, and one special character.");
      return;
    }
    try {
      axios
        .post("http://localhost:5155/api/Account/Register", {
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          password: registerData.password,
          address: registerData.address,
          gender: registerData.gender,
          phoneNumber: registerData.phoneNumber,
        })
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((errors) => {
          console.log(errors);
        });
    } catch (error) {
      console.log(error);
    }
    // Perform registration logic (e.g., send data to backend)
    console.log("Registering user with data:", registerData);
  };

  const handleOnClictloginButton = (e) => {
    e.preventDefault(); // Prevent page reload

    console.log("login button clicked!");
    try {
      axios
        .post("http://localhost:5155/api/Account/Login", {
          email: loginData.email,
          password: loginData.password,
        })
        .then((res) => {
          console.log(res);
          if(res.data.statusCode == 200){
            toast.success("logged in successfully")
            setAuthToken(res.data.data.token);
            const { user } = getAuthToken();
            const role ="http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
            console.log(user[role]);

            if (user[role] == "Admin") {
              navigate("/admin-home");
            } else if (user[role] == "User") {
              navigate("/user-home");
            }
            
          }
          else if (res.data.statusCode == 400) {
            toast.error(res.data.message);
          }
          
        })
        .catch((errors) => {
          console.log(errors);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
<>
    
    <PageWrapper>
      <Overlay>
        <header className="bg-green-600 text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-xl font-bold">ChampionMaker</h1>
            <nav className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                Home
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                About
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Contact
              </a>
            </nav>
          </div>
        </header>
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
        
        <main className="flex flex-1 justify-center items-center py-8 px-4">
          <FormContainer>
            <div className="flex justify-center space-x-4 mb-6">
              <button
                className={`font-semibold pb-1 border-b-2 focus:outline-none ${
                  isLogin ? "border-green-700 text-green-700" : "text-gray-500"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`font-semibold pb-1 focus:outline-none ${
                  !isLogin
                    ? "border-b-2 border-green-700 text-green-700"
                    : "text-gray-500"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            {isLogin ? (
              <form className="space-y-4" onSubmit={handleOnClictloginButton}>
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Welcome Back!
                </h2>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <i class="fas fa-sign-in-alt mr-2"></i> Login
                </button>
              </form>
            ) : (
              <form
                className="space-y-4"
                onSubmit={handleOnClictRegisterButton}
              >
                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  Create an Account
                </h2>
                <input
                  type="text"
                  name="firstName"
                  minLength={1}
                  maxLength={20}
                  required
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="lastName"
                  minLength={1}
                  maxLength={20}
                  required
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="phone"
                  name="phoneNumber"
                  required
                  value={registerData.phoneNumber}
                  onChange={handleRegisterChange}
                  placeholder="Enter your phone Number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="password"
                  name="password"
                  required
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="address"
                  name="address"
                  minLength={1}
                  maxLength={100}
                  required
                  value={registerData.address}
                  onChange={handleRegisterChange}
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <select
                  name="gender"
                  id="gender"
                  required
                  value={registerData.gender}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <i className="fas fa-user-plus mr-2"></i> Register
                </button>
              </form>
            )}
          </FormContainer>
        </main>
      </Overlay>

      <footer className="bg-green-600 text-white py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <p className="text-sm">
            &copy; 2025 ChampionMaker - Helwan University Students. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </PageWrapper>
    
    </>
  );
}
