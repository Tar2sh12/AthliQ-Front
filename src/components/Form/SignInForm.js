import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./FormStyles";
import { Container } from "../../globalStyles";
import validateSignInForm from "./validateSignIn";
import { getAuthToken, setAuthToken } from "../../services/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const resultError = validateSignInForm({ email, password });

    if (resultError !== null) {
      setError(resultError);
      return;
    }

    console.log("login button clicked!");
    try {
      axios
        .post("http://localhost:5155/api/Account/Login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.statusCode == 200) {
            // toast.success("logged in successfully")
            setAuthToken(res.data.data.token);
            const { user } = getAuthToken();
            const role =
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
            console.log(user[role]);

            if (user[role] == "Admin") {
              navigate("/adminHomePage");
            } else if (user[role] == "User") {
              navigate("/");
            }
          } else if (res.data.statusCode == 400) {
            setError(res.data.message);
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
    setError(null);
  };

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  const formData = [
    {
      label: t("auth.signIn.email"),
      value: email,
      onChange: (e) => setEmail(e.target.value),
      type: "email",
      placeholder: t("auth.signIn.placeholders.email"),
      name: "email",
    },
    {
      label: t("auth.signIn.password"),
      value: password,
      onChange: (e) => setPassword(e.target.value),
      type: "password",
      placeholder: t("auth.signIn.placeholders.password"),
      name: "password",
    },
  ];
  return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>{t("auth.signIn.title")}</FormTitle>
            <FormWrapper onSubmit={handleSubmit}>
              {formData.map((el, index) => (
                <FormInputRow key={index}>
                  <FormLabel>{el.label}</FormLabel>
                  <FormInput
                    type={el.type}
                    placeholder={`${el.label.toLocaleLowerCase()}`}
                    value={el.value}
                    onChange={el.onChange}
                  />
                </FormInputRow>
              ))}

              <FormButton type="submit">{t('auth.signIn.submit')}</FormButton>
            </FormWrapper>
            {error && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
                error
              >
                {t(`auth.signIn.errors.${error}`)}
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

export default SignInForm;
