import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // login logic
    res.status(200).json({ success: true })
  } else {
    res.status(405).end()
  }
}
