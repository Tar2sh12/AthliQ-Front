import styled from "styled-components";
import { Container } from "../../globalStyles";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: transparent;
  margin-bottom: -80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: absolute;
  top: 0;
  z-index: 50;
  width: 100%;

  transition: background-color 0.3s ease-in;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between; // Better than 'start'
  align-items: center;
  height: 80px;
  position: relative; // Establish stacking context
`;
export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
  z-index: 60;
`;

export const NavIcon = styled.img`
  margin-right: 1rem;
  width: 15rem;
`;

export const MobileIcon = styled.div`
  display: none;
  z-index: 60;
  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    ${(props) => (props.lang === "ar" ? "left: 0;" : "right: 0;")}
    transform: ${props =>
      props.lang === "ar" 
        ? "translate(30%, 60%)" 
        : "translate(-30%, 60%)"};
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  width: 100%;

  @media screen and (max-width: 960px) {
    padding-top: 150px;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    padding-top: 30%;
    top: 0;
    left: 0;
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? "visible" : "hidden")};
    transform: translateY(${({ show }) => (show ? "0" : "-10px")});
    transition: opacity 0.5s ease;
    background-color: #071c2f;
    padding-top: 100px;
  }

  > li:first-child {
    margin-left: auto;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  cursor: pointer;

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;

export const NavLinks = styled.span`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  &:hover {
    color: #c8c9d8;
    transition: all 0.3s ease;
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;

export const LanguageButton = styled.button`
  background: transparent;
  border: none;
  color: #89CFF0;
  cursor: pointer;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  z-index: 60;
  position: relative;
  margin: 0 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Desktop positioning */
  @media screen and (min-width: 961px) {
    position: static;
    margin-right: ${props => props.lang === 'en' ? '20px' : '0'};
    margin-left: ${props => props.lang === 'ar' ? '20px' : '0'};
  }

  /* Mobile positioning */
  @media screen and (max-width: 960px) {
    position: absolute;
    top: 20px;
    ${props => props.lang === 'en' ? 'right: 60px;' : 'left: 60px;'}
    font-size: 1.1rem;
    padding: 10px 15px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    
    /* When menu is open */
    ${props => props.showMenu && `
      ${props.lang === 'en' ? 'right: calc(100% - 120px);' : 'left: calc(100% - 120px);'}
    `}
  }

  /* Small mobile devices */
  @media screen and (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.9rem;
    ${props => props.lang === 'en' ? 'right: 50px;' : 'left: 50px;'}
    
    ${props => props.showMenu && `
      ${props.lang === 'en' ? 'right: calc(100% - 100px);' : 'left: calc(100% - 100px);'}
    `}
  }
`;  
