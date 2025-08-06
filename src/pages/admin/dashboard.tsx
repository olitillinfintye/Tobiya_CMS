import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'

const AdminDashboard: NextPage = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#00F5D4] font-orbitron">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/projects" className="block p-6 text-center bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-bold text-white font-orbitron">Manage Projects</h2>
        </Link>
        <Link href="/admin/team" className="block p-6 text-center bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-bold text-white font-orbitron">Manage Team</h2>
        </Link>
        <Link href="/admin/blog" className="block p-6 text-center bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-bold text-white font-orbitron">Manage Blog</h2>
        </Link>
        <Link href="/admin/contacts" className="block p-6 text-center bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-bold text-white font-orbitron">View Contacts</h2>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard