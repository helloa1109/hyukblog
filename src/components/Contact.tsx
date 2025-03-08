"use client"

import type React from "react"
import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { useInView } from "react-intersection-observer"

interface ContactProps {
  setIsHovering: (isHovering: boolean) => void
}

const Contact: React.FC<ContactProps> = ({ setIsHovering }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
  }

  return (
    <ContactSection id="contact" ref={ref}>
      <ContactContainer $inView={inView}>
        <SectionTitle>Get In Touch</SectionTitle>
        <ContactContent>
          <ContactInfo>
            <InfoItem>
              <InfoIcon>📍</InfoIcon>
              <InfoText>San Francisco, CA</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📧</InfoIcon>
              <InfoText>hello@example.com</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📱</InfoIcon>
              <InfoText>+1 (123) 456-7890</InfoText>
            </InfoItem>
          </ContactInfo>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="message">Message</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              />
            </FormGroup>
            <SubmitButton
              type="submit"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Send Message
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </ContactContainer>
    </ContactSection>
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

const ContactSection = styled.section`
  padding: 100px 0;
  background-color: var(--color-dark);
`

const ContactContainer = styled.div<{ $inView: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  opacity: ${({ $inView }) => ($inView ? 1 : 0)};
  transform: ${({ $inView }) => ($inView ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 0.6s ease, transform 0.6s ease;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-text);
`

const ContactContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ContactInfo = styled.div`
  flex: 1;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`

const InfoIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
`

const InfoText = styled.p`
  font-size: 1.1rem;
  color: var(--color-text);
`

const ContactForm = styled.form`
  flex: 2;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
`

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  min-height: 150px;
`

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-accent);
  }
`

export default Contact

