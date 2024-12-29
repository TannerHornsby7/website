'use client';

import { useEffect } from "react";
import portfolioData from "@/data/portfolio.json";
import FloatingNav from "@/app/components/FloatingNav";
const sections = ['education', 'work', 'projects', 'skills'];

let prevY = 0;
let sectionVisibilities : { [key: string]: boolean } = {
  education: false,
  work: false,
  projects: false,
  skills: false
};


function setUpSectionObserver() {

  const observer = new IntersectionObserver(    
    (entries) => {
      // toggle visibility of sections by flipping each of the entries within the sectionVisibilities object
      const newVisibilities = { ...sectionVisibilities };
      entries.forEach(entry => {
        newVisibilities[entry.target.id] = entry.isIntersecting;
      });

      sectionVisibilities = newVisibilities;

      // turn newVisibilities into a list of its keys for which the value is true
      const visibleEntries = Object.keys(newVisibilities).filter(key => newVisibilities[key]);

      // use current y and previous y to determine if the user is scrolling up or down
      // if the user is scrolling down, set the hash to the last visible entry
      // if the user is scrolling up, set the hash to the first visible entry
      const currentY = window.scrollY;
      if (currentY > prevY) {
        window.history.replaceState(null, '', `#${visibleEntries[visibleEntries.length - 1]}`);
      } else {
        window.history.replaceState(null, '', `#${visibleEntries[0]}`);
      }
      prevY = currentY;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: [0.5]
    }
  );


  // initialize the section visibilities object with the current visibility of each section
  sections.forEach(section => {
    const element = document.getElementById(section);
    if (!element) return;
    if (element) observer.observe(element);
  });

  return () => observer.disconnect();
}


export default function Portfolio() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      if (hash === 'education') {
        window.scrollTo({ top: -10, behavior: 'smooth' });
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    return setUpSectionObserver();
  }, []);

  return (
    <main className="min-h-screen w-full pl-16 font-body">
      <FloatingNav />
      
      <section id="education">
        <h2 className="text-2xl font-header text-dark mb-8">Education</h2>
        {portfolioData.education.map((edu, i) => (
          <div key={i} className="mb-6 border-b border-lightgray pb-4">
            <h3 className="text-lg font-bold text-dark">{edu.school}</h3>
            <p className="text-sm text-gray">{edu.degree} • {edu.date}</p>
            <p className="mt-2 text-sm text-darkgray">{edu.details}</p>
          </div>
        ))}
      </section>

      <section id="work" className="pt-24">
        <h2 className="text-2xl font-header text-dark mb-8">Work Experience</h2>
        {portfolioData.work.map((job, i) => (
          <div key={i} className="mb-6 border-b border-lightgray pb-10">
            <h3 className="text-lg font-bold text-dark">{job.company}</h3>
            <p className="text-sm text-gray">{job.role} • {job.date}</p>
            <p className="mt-2 text-sm text-darkgray">{job.description}</p>
          </div>
        ))}
      </section>

      <section id="projects" className="pt-24">
        <h2 className="text-2xl font-header text-dark mb-8">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {portfolioData.projects.map((project, i) => (
            <div key={i} className="p-4 border border-lightgray rounded-lg hover:bg-highlight transition-colors">
              <h3 className="text-lg font-bold text-dark">{project.name}</h3>
              <p className="text-sm text-gray">{project.date}</p>
              <p className="mt-2 text-sm text-darkgray">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="pt-24 mb-16">
        <h2 className="text-2xl font-header text-dark mb-8">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(portfolioData.skills).map(([category, items]) => (
            <div key={category} className="p-4 border border-lightgray bg-light">
              <h3 className="text-sm font-bold uppercase mb-2 text-dark">{category}</h3>
              <div className="flex gap-2 flex-wrap">
                {items.map(skill => (
                  <span key={skill} className="px-2 py-1 text-xs bg-highlight text-darkgray rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}