import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { NextPage } from 'next'
import Link from 'next/link'

type Contact = { id: number; name: string; email: string; message: string; created_at: string; };

const ViewContacts: NextPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => { fetchContacts() }, [])

  const fetchContacts = async () => {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
    if (data) setContacts(data)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const response = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (response.ok) fetchContacts()
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link href="/admin/dashboard" className="text-[#00F5D4] hover:underline mb-6 block">&larr; Back to Dashboard</Link>
      <h1 className="text-4xl font-bold text-[#00F5D4] font-orbitron mb-8">Contact Messages</h1>
      <div className="space-y-6">
        {contacts.length > 0 ? contacts.map(contact => (
          <div key={contact.id} className="bg-gray-800 p-6 rounded-xl relative">
            <button onClick={() => handleDelete(contact.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 font-bold text-2xl">&times;</button>
            <div className="mb-4">
              <p className="text-gray-400">From: <span className="font-semibold text-white">{contact.name}</span> ({contact.email})</p>
              <p className="text-gray-400">Received: {new Date(contact.created_at).toLocaleString()}</p>
            </div>
            <p className="text-gray-200 whitespace-pre-wrap">{contact.message}</p>
          </div>
        )) : (
          <p className="text-center text-gray-400">No contact messages yet.</p>
        )}
      </div>
    </div>
  )
}

export default ViewContacts