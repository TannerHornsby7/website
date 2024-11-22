'use client';

import { useEffect, useState } from "react";
import portfolioData from "@/data/portfolio.json";
import { motion } from "framer-motion";

// backend data (non-secrets)
import type { Schema } from "@/amplify/data/resource"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import outputs from "@/amplify_outputs.json"

Amplify.configure(outputs)

const client = generateClient<Schema>()

const sections = ['education', 'work', 'projects', 'skills'];

function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(window.location.href.slice(window.location.href.indexOf('#') + 1));
  

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // listen for the hashchange event
    window.addEventListener('hashchange', () => {
      // get the entire url from the browser
      const url = window.location.href;
      setActiveSection(url.slice(url.indexOf('#') + 1));
    });
  }, []);

  return (
    <motion.nav className="fixed left-4 top-48 h-screen flex flex-col justify-start space-y-20">
      {sections.map((section, index) => (
        <motion.a
          key={section}
          href={`#${section}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`text-xs text-center font-bold rotate-90 cursor-pointer tracking-wide ${
            activeSection === section ? 'text-gray-900 font-extrabold' : 'text-gray-400'
          }`}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -200, rotate: 90 }}
          whileHover={{ scale: 1.1, color: "#000" }}
          transition={{ duration: 0.1, delay: isVisible ? index * 0.1 : 0 }}
        >
          {section.toUpperCase()}
        </motion.a>
      ))}
    </motion.nav>
  );
}

export default function Portfolio() {
  const [response, setResponse] = useState<Schema['socialToBlog']['returnType']>(null);
  useEffect(() => {
    // Handle initial hash on load
    const hash = window.location.hash.slice(1);
    if (hash && sections.includes(hash)) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // sort entries by intersectionRatio
        entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            window.history.replaceState(null, '', `#${entry.target.id}`);
            // Trigger a hashchange event so FloatingNav updates
            window.dispatchEvent(new HashChangeEvent('hashchange'));
          }
        });
      },
      { threshold: 0.75 }
    );

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    client.queries.socialToBlog({
      name: "Amplify",
    }).then((res) => {
      setResponse(res.data);
      }).catch((err) => {
        console.error(err)
        });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex">
      <main className="ml-20 w-full max-w-4xl px-8 -mt-24">
        <FloatingNav />
        
        <section id="education" className="pt-24">
          <h2 className="text-2xl font-semibold mb-8">Education</h2>
          {portfolioData.education.map((edu, i) => (
            <div key={i} className="mb-6 border-b pb-4">
              <h3 className="text-lg font-bold">{edu.school}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{edu.degree} • {edu.date}</p>
              <p className="mt-2 text-sm">{edu.details}</p>
            </div>
          ))}
        </section>

        <section id="work" className="pt-24">
          <h2 className="text-2xl font-semibold mb-8">Work Experience</h2>
          {portfolioData.work.map((job, i) => (
            <div key={i} className="mb-6 border-b pb-10">
              <h3 className="text-lg font-bold">{job.company}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{job.role} • {job.date}</p>
              <p className="mt-2 text-sm">{job.description}</p>
            </div>
          ))}
        </section>

        <section id="projects" className="pt-24">
          <h2 className="text-2xl font-semibold mb-8">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioData.projects.map((project, i) => (
              <div key={i} className="p-4 border rounded-lg hover:shadow-lg transition">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{project.date}</p>
                <p className="mt-2 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="pt-24 mb-16">
          <h2 className="text-2xl font-semibold mb-8">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(portfolioData.skills).map(([category, items]) => (
              <div key={category} className="p-4 border">
                <h3 className="text-sm font-bold uppercase mb-2">{category}</h3>
                <div className="flex gap-2 flex-wrap">
                  {items.map(skill => (
                    <span key={skill} className="px-2 py-1 text-xs">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p> response: {response} </p>
        </section>
      </main>
    </div>
  );
}