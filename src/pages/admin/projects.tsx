import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { NextPage } from 'next'
import Link from 'next/link'

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  live_demo_url: string;
};

const ManageProjects: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [formData, setFormData] = useState<Partial<Project>>({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('id')
    if (data) setProjects(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'technologies' ? value.split(',').map(t => t.trim()) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const apiMethod = isEditing ? 'PUT' : 'POST'
    const endpoint = '/api/admin/projects'

    const response = await fetch(endpoint, {
      method: apiMethod,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      fetchProjects()
      resetForm()
    } else {
      alert('An error occurred.')
    }
  }

//   const handleEdit = (project: Project) => {
//     setIsEditing(true)
//     setFormData({
//       ...project,
//       technologies: project.technologies.join(', '),
//     })
//   }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const response = await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        fetchProjects()
      } else {
        alert('An error occurred.')
      }
    }
  }

  const resetForm = () => {
    setIsEditing(false)
    setFormData({})
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link href="/admin/dashboard" className="text-[#00F5D4] hover:underline mb-6 block">&larr; Back to Dashboard</Link>
      <h1 className="text-4xl font-bold text-[#00F5D4] font-orbitron mb-8">Manage Projects</h1>

      {/* Form for Adding/Editing Projects */}
      <div className="bg-gray-800 p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" required className="p-3 bg-gray-700 rounded-lg focus:outline-none focus:border-[#00F5D4] border-2 border-transparent" />
          <input name="image_url" value={formData.image_url || ''} onChange={handleChange} placeholder="Image URL" required className="p-3 bg-gray-700 rounded-lg focus:outline-none focus:border-[#00F5D4] border-2 border-transparent" />
          <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Description" required className="p-3 bg-gray-700 rounded-lg md:col-span-2 h-24 focus:outline-none focus:border-[#00F5D4] border-2 border-transparent" />
          {/* <input name="technologies" value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : ''} onChange={handleChange} placeholder="Technologies (comma-separated)" required className="p-3 bg-gray-700 rounded-lg focus:outline-none focus:border-[#00F5D4] border-2 border-transparent" /> */}
          <input name="live_demo_url" value={formData.live_demo_url || ''} onChange={handleChange} placeholder="Live Demo URL" className="p-3 bg-gray-700 rounded-lg focus:outline-none focus:border-[#00F5D4] border-2 border-transparent" />
          <div className="md:col-span-2 flex items-center gap-4">
            <button type="submit" className="px-6 py-2 font-bold text-[#0F1A2C] bg-[#00F5D4] rounded-lg hover:bg-opacity-90 transition-colors">{isEditing ? 'Update Project' : 'Add Project'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="px-6 py-2 font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">Cancel</button>}
          </div>
        </form>
      </div>

      {/* List of Existing Projects */}
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-sm text-gray-400">{project.description.substring(0, 50)}...</p>
            </div>
            <div className="flex gap-4">
              {/* <button onClick={() => handleEdit(project)} className="px-4 py-2 font-semibold text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-500">Edit</button> */}
              <button onClick={() => handleDelete(project.id)} className="px-4 py-2 font-semibold text-sm text-white bg-red-600 rounded-lg hover:bg-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageProjects