import { supabase } from '../lib/supabaseClient'
import ProjectCard from '../components/ProjectCard'
import TeamMemberCard from '../components/TeamMemberCard'
import type { GetStaticProps, NextPage } from 'next'
import { useState, useCallback, useEffect } from 'react' // Import useEffect
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// --- Type Definitions ---
type Project = { id: number; title: string; description: string; image_url: string; technologies: string[]; };
type TeamMember = { id: number; name: string; role: string; image_url: string; };
type Post = { id: number; title: string; content: string; created_at: string; };

type HomeProps = {
  projects: Project[];
  members: TeamMember[];
  posts: Post[];
};

// --- Main Page Component ---
const Home: NextPage<HomeProps> = ({ projects, members, posts }) => {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false) // State to check if we are on the client side

  const projectsSection = useScrollAnimation();
  const teamSection = useScrollAnimation();
  const blogSection = useScrollAnimation();
  const contactSection = useScrollAnimation();

  useEffect(() => {
    setIsClient(true) // Set to true once the component mounts on the client
  }, [])

  const particlesInit = useCallback(async (engine: any) => { // Use 'any' to bypass type conflict
    await loadFull(engine);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    if (response.ok) {
      setMessage('Thank you for your message! We will get back to you soon.');
      e.currentTarget.reset();
    } else {
      setMessage('Sorry, there was an error sending your message. Please try again.');
    }
  };

  return (
    <>
      {/* Home Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center">
        {isClient && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: { color: { value: '#0F1A2C' } },
              fpsLimit: 60,
              interactivity: {
                events: {
                  onHover: { enable: true, mode: 'repulse' },
                  resize: true,
                },
                modes: {
                  repulse: { distance: 100, duration: 0.4 },
                },
              },
              particles: {
                color: { value: '#00F5D4' },
                links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.1, width: 1 },
                collisions: { enable: true },
                move: {
                  direction: 'none',
                  enable: true,
                  outModes: { default: 'bounce' },
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: { density: { enable: true, value_area: 800 }, value: 80 },
                opacity: { value: 0.5 },
                shape: { type: 'circle' },
                size: { value: { min: 1, max: 5 } },
              },
              detectRetina: true,
            }}
            className="absolute inset-0 z-0"
          />
        )}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4 font-orbitron">
            Tobiya Game Studio
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Pioneering immersive XR & game experiences from Ethiopia to the world.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        ref={projectsSection.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: projectsSection.isInView ? 1 : 0, y: projectsSection.isInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-[#00F5D4] mb-8 font-orbitron text-center">Our Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        id="team"
        ref={teamSection.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: teamSection.isInView ? 1 : 0, y: teamSection.isInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-[#00F5D4] mb-8 font-orbitron text-center">Meet the Innovators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        id="blog"
        ref={blogSection.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: blogSection.isInView ? 1 : 0, y: blogSection.isInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-20 max-w-4xl"
      >
        <h2 className="text-4xl font-bold text-[#00F5D4] mb-12 font-orbitron text-center">Studio Blog</h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-3xl font-bold text-white mb-2 font-orbitron">{post.title}</h3>
              <p className="text-gray-400 mb-4">{new Date(post.created_at).toLocaleDateString()}</p>
              <p className="text-gray-300">{post.content.substring(0, 200)}...</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        ref={contactSection.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: contactSection.isInView ? 1 : 0, y: contactSection.isInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-20 max-w-2xl"
      >
        <h2 className="text-4xl font-bold text-[#00F5D4] mb-8 font-orbitron text-center">Get in Touch</h2>
        <form onSubmit={handleContactSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl">
          {/* Form fields remain the same */}
        </form>
        {message && <p className="mt-6 text-center text-lg">{message}</p>}
      </motion.section>
    </>
  )
}

// --- Data Fetching ---
export const getStaticProps: GetStaticProps = async () => {
  const { data: projects } = await supabase.from('projects').select('*').limit(3);
  const { data: members } = await supabase.from('team').select('*');
  const { data: posts } = await supabase.from('blog').select('*').order('created_at', { ascending: false });

  return {
    props: {
      projects: projects || [],
      members: members || [],
      posts: posts || [],
    },
    revalidate: 10,
  }
}

export default Home