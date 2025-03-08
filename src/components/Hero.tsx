"use client"

import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { ArrowDown } from "lucide-react"

interface HeroProps {
  setIsHovering: (isHovering: boolean) => void
}

const Hero = ({ setIsHovering }: HeroProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
  
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
  
      const ctx = canvas.getContext("2d")
      if (!ctx) return
  
      // 캔버스설정
      const setCanvasDimensions = () => {
        if (!canvas) return
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
  
      setCanvasDimensions()
      window.addEventListener("resize", setCanvasDimensions)
  
      // (canvas를 매개변수로 전달)
      class Particle {
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        color: string
        canvas: HTMLCanvasElement
  
        constructor(canvas: HTMLCanvasElement) {
          this.canvas = canvas
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 3 + 1
          this.speedX = Math.random() * 1 - 0.5
          this.speedY = Math.random() * 1 - 0.5
          this.color = `rgba(255, 84, 112, ${Math.random() * 0.5})`
        }
  
        update() {
          this.x += this.speedX
          this.y += this.speedY
  
          if (this.x > this.canvas.width) this.x = 0
          else if (this.x < 0) this.x = this.canvas.width
          if (this.y > this.canvas.height) this.y = 0
          else if (this.y < 0) this.y = this.canvas.height
        }
  
        draw(ctx: CanvasRenderingContext2D) {
          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
  
      // 파티클
      const particlesArray: Particle[] = []
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100)
  
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(canvas))
      }
  
      // 애니메이션 루프
      const animate = () => {
        if (!ctx || !canvas) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
  
        particlesArray.forEach((particle) => {
          particle.update()
          particle.draw(ctx)
        })
  
        connectParticles()
        requestAnimationFrame(animate)
      }
  
      // 파티클라인
      const connectParticles = () => {
        if (!ctx) return
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x
            const dy = particlesArray[a].y - particlesArray[b].y
            const distance = Math.sqrt(dx * dx + dy * dy)
  
            if (distance < 150) {
              ctx.strokeStyle = `rgba(255, 84, 112, ${0.1 - distance / 1500})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
              ctx.stroke()
            }
          }
        }
      }
  
      animate()
  
      return () => {
        window.removeEventListener("resize", setCanvasDimensions)
      }
    }, [])
  
    const handleHover = (hovering: boolean) => {
      setIsHovering(hovering)
    }
  
    const scrollToAbout = () => {
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  
    return (
    <HeroSection>
      <Canvas ref={canvasRef} />
      <HeroContent>
        <Greeting>Hello, I'm</Greeting>
        <Name>Sang Hyuk LEE</Name>
        <Title>Frontend Developer</Title>
        <Description>짧은 한줄 소개 말 자 리 </Description>
        <CTAButton
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          onClick={scrollToAbout}
        >
          Explore My Work
        </CTAButton>
      </HeroContent>
      <ScrollIndicator
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={scrollToAbout}
      >
        <ArrowDown size={24} />
      </ScrollIndicator>
    </HeroSection>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  overflow: hidden;
`

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
`

const Greeting = styled.p`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards 0.2s;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const Name = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-accent)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards 0.4s;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards 0.6s;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  color: var(--color-text);
  opacity: 0.8;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards 0.8s;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const CTAButton = styled.button`
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-accent)
  );
  color: white;
  border: none;
  border-radius: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards 1s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 84, 112, 0.3);
  }
`

const ScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: none;
  color: var(--color-text);
  animation: ${float} 2s ease-in-out infinite;
  opacity: 0;
  animation: ${float} 2s ease-in-out infinite, ${fadeIn} 0.6s ease forwards 1.2s;
  
  &:hover {
    color: var(--color-primary);
  }
`

export default Hero

