'use client';

/*
Taking a break from this for now, but current goal is to implement as follows:
- initialize an array of visisbility states representing if the section intersects the viewbox currently or not
- use the intersectionobserver to update this state as we notice changes in intersections
- decompose the array into a list of visible sections
- use scroll direction to decide whether we should use the first or last of these sections
- update the hash to reflect the current section

What is going wrong rn:
- could be an issue with initialization or the observer itself, but
  education and work are always set to visible even when they aren't

How can we practice debugging best practices to get a fix on this?
- determine where to add breakpoints
- decompose into smaller functions
-use the intersection-observer-debugger for visual guide to intersection firing

What did i do to fix this?
- added breakpoints to the observer callback
- noticed that the array of visibilities was not updating correctly, we were continuously using the initial (empty) state
- definitely want a more satifying answer as to why this was occurring (same thing was happening with prevY)
   - apparently its because how i used setState! i was using the previous state to update the new state, but the previous state was always the initial state
   - instead, i should have used the functional form of setState which is setState(prevState => newState)
- for now, i am maintaining the visibility list and prev y as global variables, but i should probably move them into a ref
  later...
*/


// debugging tool for IntersectionObserver
// import "intersection-observer-debugger"

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
      let newVisibilities = { ...sectionVisibilities };
      entries.forEach(entry => {
        newVisibilities[entry.target.id] = entry.isIntersecting;
      });

      console.log("new visibilities are", newVisibilities);
      sectionVisibilities = newVisibilities;

      // turn newVisibilities into a list of its keys for which the value is true
      const visibleEntries = Object.entries(newVisibilities).filter(([_, value]) => value).map(([key, _]) => key);
      console.log(visibleEntries);

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