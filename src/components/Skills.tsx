"use client"

import styled, { keyframes } from "styled-components"
import { useInView } from "react-intersection-observer"

interface SkillsProps {
  setIsHovering: (isHovering: boolean) => void
}

interface Skill {
  name: string
  level: number
  color: string
}

const Skills = ({ setIsHovering }: SkillsProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleHover = (hovering: boolean) => {
    setIsHovering(hovering)
  }

  const frontendSkills: Skill[] = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "TypeScript", level: 85, color: "#3178C6" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "HTML/CSS", level: 90, color: "#E34F26" },
    { name: "Styled Components", level: 85, color: "#DB7093" },
  ]

  const otherSkills: Skill[] = [
    { name: "Node.js", level: 75, color: "#339933" },
    { name: "GraphQL", level: 70, color: "#E10098" },
    { name: "Git", level: 85, color: "#F05032" },
    { name: "UI/UX Design", level: 80, color: "#FF61F6" },
    { name: "Testing", level: 75, color: "#FF6C37" },
  ]

  return (
    <SkillsSection id="skills" ref={ref}>
      <SkillsContainer>
        <SectionTitle $inView={inView}>My Skills</SectionTitle>
        <SkillsDescription $inView={inView}>
          스킬텍스트
        </SkillsDescription>

        <SkillsGrid>
          <SkillsColumn $inView={inView} $delay={0.2}>
            <SkillsColumnTitle>Frontend Development</SkillsColumnTitle>
            {frontendSkills.map((skill, index) => (
              <SkillItem key={index} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                <SkillName>{skill.name}</SkillName>
                <SkillBarContainer>
                  <SkillBar $level={skill.level} $color={skill.color} $inView={inView} $delay={0.2 + index * 0.1} />
                </SkillBarContainer>
                <SkillLevel>{skill.level}%</SkillLevel>
              </SkillItem>
            ))}
          </SkillsColumn>

          <SkillsColumn $inView={inView} $delay={0.4}>
            <SkillsColumnTitle>Other Skills</SkillsColumnTitle>
            {otherSkills.map((skill, index) => (
              <SkillItem key={index} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                <SkillName>{skill.name}</SkillName>
                <SkillBarContainer>
                  <SkillBar $level={skill.level} $color={skill.color} $inView={inView} $delay={0.4 + index * 0.1} />
                </SkillBarContainer>
                <SkillLevel>{skill.level}%</SkillLevel>
              </SkillItem>
            ))}
          </SkillsColumn>
        </SkillsGrid>
      </SkillsContainer>
    </SkillsSection>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const SkillsSection = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
`

const SkillsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionTitle = styled.h2<{ $inView: boolean }>`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  opacity: ${({ $inView }) => ($inView ? 1 : 0)};
  transform: ${({ $inView }) => ($inView ? "translateY(0)" : "translateY(30px)")};
  transition: opacity 0.6s ease, transform 0.6s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(
      to right,
      var(--color-primary),
      var(--color-accent)
    );
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SkillsDescription = styled.p<{ $inView: boolean }>`
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  margin-bottom: 3rem;
  opacity: ${({ $inView }) => ($inView ? 1 : 0)};
  transform: ${({ $inView }) => ($inView ? "translateY(0)" : "translateY(30px)")};
  transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const SkillsColumn = styled.div<{ $inView: boolean; $delay: number }>`
  opacity: ${({ $inView }) => ($inView ? 1 : 0)};
  transform: ${({ $inView }) => ($inView ? "translateY(0)" : "translateY(30px)")};
  transition: opacity 0.6s ease ${({ $delay }) => $delay}s, 
              transform 0.6s ease ${({ $delay }) => $delay}s;
`

const SkillsColumnTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const SkillItem = styled.div`
  margin-bottom: 1.5rem;
`

const SkillName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
`

const SkillBarContainer = styled.div`
  height: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`

const SkillBar = styled.div<{
  $level: number
  $color: string
  $inView: boolean
  $delay: number
}>`
  height: 100%;
  width: ${({ $inView, $level }) => ($inView ? `${$level}%` : "0%")};
  background-color: ${({ $color }) => $color};
  border-radius: 5px;
  transition: width 1s ease ${({ $delay }) => $delay}s;
`

const SkillLevel = styled.span`
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
`

export default Skills

