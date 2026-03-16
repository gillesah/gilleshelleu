import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
app.use(express.json())

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
      html: `<p><strong>Nom :</strong> ${name}</p><p><strong>Email :</strong> ${email}</p><hr><p>${message.replace(/\n/g, '<br>')}</p>`,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('SMTP error:', err.message)
    res.status(500).json({ error: 'Erreur envoi email.' })
  }
})

app.listen(3001, () => console.log('API contact listening on :3001'))
