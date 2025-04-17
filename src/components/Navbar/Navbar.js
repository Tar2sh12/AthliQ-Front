import React, { useState } from "react";
import { FaRProject, FaTimes } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { IconContext } from "react-icons";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
  LanguageButton, // Add this to your NavbarStyles.js
} from "./NavbarStyles.js";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "../../data/NavbarData";
import { getAuthToken, removeAuthToken } from "../../services/auth.jsx";
import { useTranslation } from "react-i18next"; // Add this import

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation(); // Initialize translation
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const { user } = getAuthToken();
  const isLoggedIn = !!user;
  const role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const navigate = useNavigate();
  let location = useLocation();

  // Filter the navigation items based on role and logged-in status
  const filteredNavItems = data(t).filter((item) => {
    if (item.role === "not loggedin") {
      return !isLoggedIn;
    } else {
      return isLoggedIn && (user[role] === item.role || item.role === "User");
    }
  });

  const handleClick = () => {
    setShow(!show);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const closeMobileMenu = (to, id, text) => {
    if (id && location.pathname === "/") {
      scrollTo(id);
    }

    if (text === "Log Out") {
      removeAuthToken();
    }
    navigate(to);
    setShow(false);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <NavIcon
              src={
                i18n.language == "en"
                  ? "./assets/logo-ph2.png"
                  : "./assets/arabicLogo.png"
              }
              style={{ width: "190px" }}
              alt="logo"
            />
          </NavLogo>

          {/* Language Toggle Button */}
          {/* <LanguageButton onClick={toggleLanguage}>
            {currentLanguage === 'en' ? 'English':'العربية' }
          </LanguageButton>
           */}
          <LanguageButton onClick={toggleLanguage}>
            {currentLanguage === "en" ? "English" : "العربية"}
          </LanguageButton>

          <MobileIcon onClick={handleClick} lang={currentLanguage}>
            {show ? <FaTimes /> : <CgMenuRight />}
          </MobileIcon>

          <NavMenu show={show}>
            <>
              {filteredNavItems.map((el, index) => (
                <NavItem key={index}>
                  <NavLinks
                    onClick={() => closeMobileMenu(el.to, el.id, el.text)}
                  >
                    {t(el.text)} {/* Wrap text with translation */}
                  </NavLinks>
                </NavItem>
              ))}
            </>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
