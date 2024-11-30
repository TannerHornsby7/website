'use client';

import { useEffect } from "react";
import portfolioData from "@/data/portfolio.json";
import FloatingNav from "@/app/components/FloatingNav";
const sections = ['education', 'work', 'projects', 'skills'];


function setUpSectionObserver() {
  let lastSection = '';
  
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (!visibleEntries.length) return;

      const topSection = visibleEntries.reduce((top, current) => {
        const topIndex = sections.indexOf(top.target.id);
        const currentIndex = sections.indexOf(current.target.id);
        return currentIndex < topIndex ? current : top;
      });

      if (topSection.target.id !== lastSection) {
        lastSection = topSection.target.id;
        window.history.replaceState(null, '', `#${topSection.target.id}`);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: [0.5, 0.9, 1] // this means the callback gets called when the section is 50%, 90%, and 100% visible
      // thank you this guy:https://stackoverflow.com/questions/62084306/intersectionobserver-not-working-in-safari-or-ios
    }
  );

  sections.forEach(section => {
    const element = document.getElementById(section);
    if (element) observer.observe(element);
  });

  return () => observer.disconnect();
}

export default function Portfolio() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      if (hash === 'education') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    return setUpSectionObserver();
  }, []);

  return (
      <main className="min-h-screen w-full pl-16">
        <FloatingNav />
        
        <section id="education">
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
        </section>
      </main>
  );
}