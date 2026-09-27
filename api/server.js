import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
app.use(express.json())

// CORS : le site est désormais servi par Cloudflare Pages (autre origine que cette
// API, restée sur lemeon2 derrière api.gilleshelleu.com). On n'autorise que le
// domaine de production, jamais '*' ni les URLs *.pages.dev de prévisualisation.
const ALLOWED_ORIGINS = new Set([
  'https://gilleshelleu.com',
  'https://www.gilleshelleu.com',
])
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// Échappement HTML — name/message viennent du visiteur et sont insérés dans le
// corps HTML de l'e-mail : sans échappement, injection de balises possible.
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Simple in-memory rate limiter (max 5 requests per IP per 10 min)
const attempts = new Map()
function rateLimit(req, res, next) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress
  const now = Date.now()
  const entry = attempts.get(ip) || { count: 0, reset: now + 10 * 60 * 1000 }
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 10 * 60 * 1000 }
  entry.count++
  attempts.set(ip, entry)
  if (entry.count > 5) return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans 10 minutes.' })
  next()
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

app.post('/api/contact', rateLimit, async (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email invalide.' })
  }

  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return res.status(400).json({ error: 'Contenu trop long.' })
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[gilleshelleu.com] Message de ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
      html: `<p><strong>Nom :</strong> ${escapeHtml(name)}</p><p><strong>Email :</strong> ${escapeHtml(email)}</p><hr><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('SMTP error:', err.message)
    res.status(500).json({ error: 'Erreur envoi email.' })
  }
})

app.listen(3001, () => console.log('API contact listening on :3001'))
