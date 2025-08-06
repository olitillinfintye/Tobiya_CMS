import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const AdminLogin: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F1A2C]">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#00F5D4] font-orbitron">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-[#00F5D4]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-[#00F5D4]"
          />
          <button
            type="submit"
            className="w-full py-3 font-bold text-[#0F1A2C] bg-[#00F5D4] rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default AdminLogin