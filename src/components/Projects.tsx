"use client"

import type React from "react"
import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { useInView } from "react-intersection-observer"

interface ProjectsProps {
  setIsHovering: (isHovering: boolean) => void
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with advanced filtering, cart functionality, and secure payments.",
    image: "https://via.placeholder.com/600x400",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com/project1",
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "Real-time analytics dashboard for social media management with data visualization.",
    image: "https://via.placeholder.com/600x400",
    technologies: ["Vue.js", "Express", "Socket.io", "D3.js"],
    link: "https://example.com/project2",
  },
  {
    id: 3,
    title: "AI-Powered Chatbot",
    description: "Intelligent chatbot for customer support using natural language processing and machine learning.",
    image: "https://via.placeholder.com/600x400",
    technologies: ["Python", "TensorFlow", "React", "Flask"],
    link: "https://example.com/project3",
  },
]

const Projects: React.FC<ProjectsProps> = ({ setIsHovering }) => {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <ProjectsSection id="projects" ref={ref}>
      <SectionTitle>프로젝트</SectionTitle>
      <ProjectsContainer>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            $inView={inView}
            $delay={index * 0.2}
            $isEven={index % 2 === 0}
            onMouseEnter={() => {
              setActiveProject(project.id)
              setIsHovering(true)
            }}
            onMouseLeave={() => {
              setActiveProject(null)
              setIsHovering(false)
            }}
          >
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectContent $isActive={activeProject === project.id}>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.technologies.map((tech, techIndex) => (
                  <TechItem key={techIndex}>{tech}</TechItem>
                ))}
              </TechStack>
              <ProjectLink
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                View Project
              </ProjectLink>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </ProjectsSection>
  )
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ProjectsSection = styled.section`
  padding: 100px 0;
  background-color: var(--color-dark);
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-text);
`

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding: 0 20px;
`

const ProjectCard = styled.div<{ $inView: boolean; $delay: number; $isEven: boolean }>`
  display: flex;
  align-items: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${({ $delay }) => $delay}s;
  flex-direction: ${({ $isEven }) => ($isEven ? "row" : "row-reverse")};

  @media (max-width: 992px) {
    flex-direction: column;
  }
`

const ProjectImage = styled.img`
  width: 50%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 30px;
  }
`

const ProjectContent = styled.div<{ $isActive: boolean }>`
  width: 50%;
  padding: 0 30px;
  transition: transform 0.3s ease;
  transform: ${({ $isActive }) => ($isActive ? "translateY(-10px)" : "translateY(0)")};

  @media (max-width: 992px) {
    width: 100%;
    padding: 0;
  }
`

const ProjectTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
`

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 1.5rem;
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.5rem;
`

const TechItem = styled.span`
  font-size: 0.9rem;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: var(--color-accent);
`

const ProjectLink = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: var(--color-text);
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-accent);
  }
`

export default Projects

