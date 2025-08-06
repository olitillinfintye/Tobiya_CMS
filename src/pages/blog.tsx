import { supabase } from '../lib/supabaseClient'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type BlogProps = {
  posts: Post[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-5xl font-bold text-[#00F5D4] mb-12 text-center font-orbitron">Studio Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-3xl font-bold text-white mb-2 font-orbitron">{post.title}</h2>
            <p className="text-gray-400 mb-4">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-300">
              {post.content.substring(0, 200)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: posts, error } = await supabase
    .from('blog')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  return {
    props: {
      posts: posts || [],
    },
    revalidate: 10,
  }
}

export default Blog