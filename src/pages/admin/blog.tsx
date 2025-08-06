import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { NextPage } from 'next'
import Link from 'next/link'

type Post = { id: number; title: string; content: string; };

const ManageBlog: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [formData, setFormData] = useState<Partial<Post>>({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/admin/blog', {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (response.ok) { fetchPosts(); resetForm(); } else { alert('An error occurred.') }
  }

  const handleEdit = (post: Post) => { setIsEditing(true); setFormData(post); }
  const resetForm = () => { setIsEditing(false); setFormData({}); }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure?')) {
      const response = await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (response.ok) fetchPosts()
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link href="/admin/dashboard" className="text-[#00F5D4] hover:underline mb-6 block">&larr; Back to Dashboard</Link>
      <h1 className="text-4xl font-bold text-[#00F5D4] font-orbitron mb-8">Manage Blog</h1>
      <div className="bg-gray-800 p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Post Title" required className="w-full p-3 bg-gray-700 rounded-lg" />
          <textarea name="content" value={formData.content || ''} onChange={handleChange} placeholder="Post Content" required rows={10} className="w-full p-3 bg-gray-700 rounded-lg" />
          <div className="flex items-center gap-4">
            <button type="submit" className="px-6 py-2 font-bold text-[#0F1A2C] bg-[#00F5D4] rounded-lg">{isEditing ? 'Update' : 'Publish'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="px-6 py-2 font-bold text-white bg-gray-600 rounded-lg">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{post.title}</h3>
            <div className="flex gap-4">
              <button onClick={() => handleEdit(post)} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg">Edit</button>
              <button onClick={() => handleDelete(post.id)} className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageBlog
