import { supabase } from '../lib/supabaseClient'
import ProjectCard from '../components/ProjectCard'
import type { GetStaticProps, NextPage } from 'next'

type Project = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
};

type ProjectsPageProps = {
  projects: Project[];
};

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold text-[#00F5D4] mb-8 text-center font-orbitron">Our Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: projects, error } = await supabase.from('projects').select('*')

  return {
    props: {
      projects: projects || [],
    },
    revalidate: 10,
  }
}

export default ProjectsPage