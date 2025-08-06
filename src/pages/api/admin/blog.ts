import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, ...data } = req.body;

  if (req.method === 'POST') {
    const { error } = await supabaseAdmin.from('blog').insert(data)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json({ message: 'Post created' })
  } else if (req.method === 'PUT') {
    const { error } = await supabaseAdmin.from('blog').update(data).eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Post updated' })
  } else if (req.method === 'DELETE') {
    const { error } = await supabaseAdmin.from('blog').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Post deleted' })
  } else {
    res.setHeader('Allow', ['POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}