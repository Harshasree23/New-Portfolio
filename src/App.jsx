import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectsSection from './components/ProjectsSection';
import Contact from './components/Contact';
import Academics from './pages/Academics';
import ProjectsPage from './pages/ProjectsPage';
import Experience from './components/Experience';
import useScrollbarColor from './components/useScrollBarColor';

import { supabase } from './supaBase';
import { ThemeProvider } from './components/ThemeContext';
import GeneratingLoader from './components/Loader';

// MainLayout now accepts the fetched data as props
function MainLayout({ skills, experience, projects }) {
  return (
    <>
      <Hero />
      <Skills data={skills} />
      <Experience data={experience} />
      <ProjectsSection data={projects} />
      
    </>
  );
}

function App() {
  useScrollbarColor();

  // State to store Supabase data
  const [projects, setProjects] = useState([]);
  const [academics, setAcademics] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetching all 4 datasets in parallel
        const [
          { data: projectsData, error: projectsError },
          { data: academicsData, error: academicsError },
          { data: skillsData, error: skillsError },
          { data: experienceData, error: experienceError }
        ] = await Promise.all([
          supabase.from('projects').select('*'),
          supabase.from('academic').select('*'),
          supabase.from('skills').select('*'),
          supabase.from('experience').select('*')
        ]);

        // Handle any errors
        if (projectsError) console.error('Error fetching projects:', projectsError);
        if (academicsError) console.error('Error fetching academics:', academicsError);
        if (skillsError) console.error('Error fetching skills:', skillsError);
        if (experienceError) console.error('Error fetching experience:', experienceError);

        // Update state with fetched data (fallback to empty array if null)
        if (projectsData) setProjects(projectsData);
        if (academicsData) setAcademics(academicsData);
        if (skillsData) setSkills(skillsData);
        if (experienceData) setExperience(experienceData);

      } catch (err) {
        console.error('Unexpected error loading data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <GeneratingLoader />
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Fixed Nav */}
        <NavBar />

        {/* Page content */}
        <main className='custom-scrollbar'>
          <Routes>
            <Route 
              path="/" 
              element={
                <MainLayout 
                  skills={skills} 
                  experience={experience} 
                  projects={projects} 
                />
              } 
            />
            <Route 
              path="/academics" 
              element={<Academics data={academics} />} 
            />
            <Route 
              path="/projects" 
              element={<ProjectsPage data={projects} />} 
            />
          </Routes>
        </main>
        <Contact />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;