import { useEffect, useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import { styled } from 'styled-components';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { Contact } from 'lucide-react';

function App() {

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, []);


  return (
    <Main>
      <Cursor position={cursorPosition} isHovering={isHovering} />
      <Navbar setIsHovering={setIsHovering} />
        <Hero setIsHovering={setIsHovering} />
        <Projects setIsHovering={setIsHovering} />
        <About setIsHovering={setIsHovering} />
        <Skills setIsHovering={setIsHovering} />
        {/* <Contact setIsHovering={setIsHovering} /> */}
    </Main>
  );
}

const Main = styled.main`
  position: relative;
  overflow-x: hidden;
`

export default App;
