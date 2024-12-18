'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const sections = ['education', 'work', 'projects', 'skills'];


export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('education');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 750);
    const handleHashChange = () => {
      const newSection = window.location.hash.slice(1);
      if (sections.includes(newSection)) {
        setActiveSection(newSection);
      }
    };
    

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.nav className="fixed left-4 top-48 h-screen flex flex-col justify-start space-y-20">
      {sections.map((section, index) => (
        <motion.a
          key={section}
          href={`#${section}`}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(section);
            if (element) {
              if (section === 'education') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }
            // might have to set active sectoin here for safari because their observer is buggy
          }}
          className={`text-xs text-center font-bold rotate-270 cursor-pointer tracking-wide ${
            activeSection === section ? 'text-gray-900 font-extrabold' : 'text-gray-400'
          }`}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -200, rotate: 270 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.1, delay: isVisible ? index * 0.1 : 0 }}
        >
          {section.toUpperCase()}
        </motion.a>
      ))}
    </motion.nav>
  );
}