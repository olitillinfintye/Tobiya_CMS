import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-primary-navy p-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-accent-teal font-orbitron">
          Tobiya Game Studio
        </Link>
        <div className="space-x-8 text-white">
          <Link href="/" className="hover:text-accent-teal">Home</Link>
          <Link href="/projects" className="hover:text-accent-teal">Our Work</Link>
          <Link href="/team" className="hover:text-accent-teal">Our Team</Link>
          <Link href="/blog" className="hover:text-accent-teal">Blog</Link>
          <Link href="/contact" className="hover:text-accent-teal">Contact</Link>
        </div>
      </div>
    </nav>
  )
}
