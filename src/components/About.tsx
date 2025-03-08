import type React from "react"
import styled, { keyframes } from "styled-components"
import { useInView } from "react-intersection-observer"

interface AboutProps {
  setIsHovering: (isHovering: boolean) => void
}

const About: React.FC<AboutProps> = ({ setIsHovering }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <AboutSection id="about" ref={ref}>
      <AboutContainer $inView={inView}>
        <AboutContent>
          <SectionTitle>About Me</SectionTitle>
          <AboutText>
            텍스트가 들어갑니다
          </AboutText>
          <SkillsContainer>
            <SkillColumn>
              <SkillTitle>Frontend</SkillTitle>
              <SkillList>
                <SkillItem $delay={0.1}>React</SkillItem>
                <SkillItem $delay={0.2}>TypeScript</SkillItem>
                <SkillItem $delay={0.3}>Styled Components</SkillItem>
                <SkillItem $delay={0.4}>Next.js</SkillItem>
              </SkillList>
            </SkillColumn>
            <SkillColumn>
              <SkillTitle>Backend</SkillTitle>
              <SkillList>
                <SkillItem $delay={0.5}>Node.js</SkillItem>
                <SkillItem $delay={0.6}>Express</SkillItem>
                <SkillItem $delay={0.7}>GraphQL</SkillItem>
                <SkillItem $delay={0.8}>MongoDB</SkillItem>
              </SkillList>
            </SkillColumn>
          </SkillsContainer>
        </AboutContent>
        <ImageContainer>
          <AboutImage src="" alt="Your Name" />
          <ImageOverlay />
        </ImageContainer>
      </AboutContainer>
    </AboutSection>
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

const AboutSection = styled.section`
  padding: 100px 0;
  background-color: var(--color-background);
  overflow: hidden;
`

const AboutContainer = styled.div<{ $inView: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  opacity: ${({ $inView }) => ($inView ? 1 : 0)};
  transform: ${({ $inView }) => ($inView ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 0.6s ease, transform 0.6s ease;

  @media (max-width: 992px) {
    flex-direction: column-reverse;
    padding: 0 20px;
  }
`

const AboutContent = styled.div`
  flex: 1;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, var(--color-primary), var(--color-accent));
  }
`

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 2rem;
`

const SkillsContainer = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SkillColumn = styled.div`
  flex: 1;
`

const SkillTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
`

const SkillItem = styled.li<{ $delay: number }>`
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay}s;

  &::before {
    content: '▹';
    color: var(--color-accent);
    margin-right: 8px;
  }
`

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  max-width: 400px;
`

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  filter: grayscale(100%) contrast(1.2);
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0%) contrast(1);
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  border: 2px solid var(--color-primary);
  border-radius: 10px;
  z-index: -1;
`

export default About

