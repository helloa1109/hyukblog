"use client"

import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"

interface CursorProps {
  position: { x: number; y: number }
  isHovering: boolean
}

const Cursor = ({ position, isHovering }: CursorProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    setIsVisible(!isMobile)

    const handleResize = () => {
      setIsVisible(!window.matchMedia("(max-width: 768px)").matches)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isVisible) return null

  return (
    <>
      <CursorDot
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <CursorRing
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        $isHovering={isHovering}
      />
    </>
  )
}

const CursorDot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background-color: var(--color-primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
`

const pulseAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
`

const CursorRing = styled.div<{ $isHovering: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ $isHovering }) => ($isHovering ? "50px" : "30px")};
  height: ${({ $isHovering }) => ($isHovering ? "50px" : "30px")};
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: width 0.2s ease-out, height 0.2s ease-out;
  animation: ${pulseAnimation} 2s infinite;
  opacity: 0.6;
  transform: translate(-50%, -50%);
`

export default Cursor

