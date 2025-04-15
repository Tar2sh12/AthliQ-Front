import React, { useState } from "react";
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormSection,
  FormRow,
  FormLabel,
  FormInputRow,
  FormMessage,
  FormButton,
  FormTitle,
  FormSelect,
} from "./FormStyles";
import { Container } from "../../globalStyles";
import validateForm from "./validateForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    gender: "Male",
    phoneNumber: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerData);
    console.log("Register button clicked!");

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(registerData.password)) {
      setError("Password must be at least 8 characters, include one uppercase letter, and one special character.");
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
          // toast.success(res.data.message);
          setSuccess(res.data.message);
        })
        .catch((errors) => {
          console.log(errors);
          setError(errors.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
    //const resultError = validateForm({ name, email, password, confirmPass });

    // if (resultError !== null) {
    // 	setError(resultError);
    // 	return;
    // }
    // setName('');
    // setEmail('');
    // setPassword('');
    // setConfirmPass('');
    // setError(null);
    setSuccess('Application was submitted!');
    navigate('/login');
  };

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  const formData = [
    {
      label: "First Name",
      name: "firstName",
      value: registerData.firstName,
      onChange: (e) =>
        setRegisterData({ ...registerData, [e.target.name]: e.target.value }),
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      value: registerData.lastName,
      onChange: (e) =>
        setRegisterData({ ...registerData, [e.target.name]: e.target.value }),
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      value: registerData.email,
      onChange: (e) =>
        setRegisterData({ ...registerData, [e.target.name]: e.target.value }),
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      value: registerData.password,
      onChange: (e) =>
        setRegisterData({ ...registerData, [e.target.name]: e.target.value }),
      type: "password",
    },
    {
      label: "Address",
      name: "address",
      value: registerData.address,
      onChange: (e) =>
        setRegisterData({ ...registerData, [e.target.name]: e.target.value }),
      type: "text",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      value: registerData.phoneNumber,
      onChange: (e) =>
        setRegisterData({ ...registerData, [e.target.name]: e.target.value }),
      type: "text",
    },
    {
      label: "Gender",
      name: "gender",
      value: registerData.gender,
      type: "select",
      options: [
        { value: "", label: "Select Gender" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },
  ];
  return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>Sign up</FormTitle>
            <FormWrapper onSubmit={handleSubmit}>
              {formData.map((el, index) => (
                <FormInputRow key={index}>
                  <FormLabel>{el.label}</FormLabel>
                  {el.type === "select" ? (
                    <FormSelect
                      name={el.name}
                      required
                      value={el.value}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      {el.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </FormSelect>
                  ) : (
                    <FormInput
                      required
                      type={el.type}
                      name={el.name}
                      placeholder={`Enter your ${el.label}`}
                      value={el.value}
                      onChange={el.onChange}
                    />
                  )}
                </FormInputRow>
              ))}
              <FormButton type="submit">Signup</FormButton>
            </FormWrapper>
            {error && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
                error
              >
                {error}
              </FormMessage>
            )}
            {success && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
              >
                {success}
              </FormMessage>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};

export default Form;
