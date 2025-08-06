import { useState } from 'react'
import type { NextPage } from 'next'

const ContactPage: NextPage = () => {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setIsSubmitting(false)

    if (response.ok) {
      setMessage('Thank you for your message! We will get back to you soon.')
      e.currentTarget.reset()
    } else {
      setMessage('Sorry, there was an error sending your message. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-5xl font-bold text-[#00F5D4] mb-8 text-center font-orbitron">Get in Touch</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl">
        <div>
          <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name</label>
          <input type="text" id="name" name="name" required className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-[#00F5D4]" />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" required className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-[#00F5D4]" />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Message</label>
          <textarea id="message" name="message" rows={5} required className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-[#00F5D4]"></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-[#00F5D4] text-[#0F1A2C] font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-500">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {message && <p className="mt-6 text-center text-lg">{message}</p>}
    </div>
  )
}

export default ContactPage