"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"

interface NavbarProps {
  setIsHovering: (isHovering: boolean) => void
}

const Navbar = ({ setIsHovering }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleHover = (hovering: boolean) => {
    setIsHovering(hovering)
  }

  return (
    <NavbarContainer $scrolled={scrolled}>
      <NavbarContent>
        <Logo onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} href="#">
          <LogoText>Portfolio</LogoText>
        </Logo>

        <MenuButton onClick={toggleMenu} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </MenuButton>

        <NavLinks $isOpen={isOpen}>
          <NavLink
            href="#about"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            href="#projects"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() => setIsOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            href="#skills"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() => setIsOpen(false)}
          >
            Skills
          </NavLink>
          <NavLink
            href="#contact"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </NavLinks>
      </NavbarContent>
    </NavbarContainer>
  )
}

const NavbarContainer = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: background-color 0.3s ease;
  background-color: ${({ $scrolled }) => ($scrolled ? "rgba(15, 15, 19, 0.9)" : "transparent")};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(10px)" : "none")};
  padding: ${({ $scrolled }) => ($scrolled ? "15px 0" : "25px 0")};
`

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  z-index: 101;
`

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-accent)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const MenuButton = styled.button`
  display: none;
  color: var(--color-text);
  z-index: 101;
  
  @media (max-width: 768px) {
    display: block;
  }
`

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-background);
    transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.3s ease-in-out;
    z-index: 100;
  }
`

const NavLink = styled.a`
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      var(--color-primary),
      var(--color-accent)
    );
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--color-primary);
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
`

export default Navbar

