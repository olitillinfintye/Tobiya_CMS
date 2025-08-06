import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { NextPage } from 'next'
import Link from 'next/link'

type TeamMember = { id: number; name: string; role: string; image_url: string; };

const ManageTeam: NextPage = () => {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [formData, setFormData] = useState<Partial<TeamMember>>({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => { fetchMembers() }, [])

  const fetchMembers = async () => {
    const { data } = await supabase.from('team').select('*').order('id')
    if (data) setMembers(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/admin/team', {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (response.ok) { fetchMembers(); resetForm(); } else { alert('An error occurred.') }
  }

  const handleEdit = (member: TeamMember) => { setIsEditing(true); setFormData(member); }
  const resetForm = () => { setIsEditing(false); setFormData({}); }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure?')) {
      const response = await fetch('/api/admin/team', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (response.ok) fetchMembers()
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link href="/admin/dashboard" className="text-[#00F5D4] hover:underline mb-6 block">&larr; Back to Dashboard</Link>
      <h1 className="text-4xl font-bold text-[#00F5D4] font-orbitron mb-8">Manage Team</h1>
      <div className="bg-gray-800 p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">{isEditing ? 'Edit Team Member' : 'Add New Member'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" required className="p-3 bg-gray-700 rounded-lg" />
          <input name="role" value={formData.role || ''} onChange={handleChange} placeholder="Role" required className="p-3 bg-gray-700 rounded-lg" />
          <input name="image_url" value={formData.image_url || ''} onChange={handleChange} placeholder="Image URL" required className="md:col-span-2 p-3 bg-gray-700 rounded-lg" />
          <div className="md:col-span-2 flex items-center gap-4">
            <button type="submit" className="px-6 py-2 font-bold text-[#0F1A2C] bg-[#00F5D4] rounded-lg">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={resetForm} className="px-6 py-2 font-bold text-white bg-gray-600 rounded-lg">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="space-y-4">
        {members.map(member => (
          <div key={member.id} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img src={member.image_url} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleEdit(member)} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg">Edit</button>
              <button onClick={() => handleDelete(member.id)} className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageTeam