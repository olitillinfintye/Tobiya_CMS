import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, ...data } = req.body;

  if (req.method === 'POST') {
    const { error } = await supabaseAdmin.from('team').insert(data)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json({ message: 'Member created' })
  } else if (req.method === 'PUT') {
    const { error } = await supabaseAdmin.from('team').update(data).eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Member updated' })
  } else if (req.method === 'DELETE') {
    const { error } = await supabaseAdmin.from('team').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: 'Member deleted' })
  } else {
    res.setHeader('Allow', ['POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
