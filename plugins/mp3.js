const { toAudio } = require('../lib/converter')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio|document/.test(mime)) throw `Reply To Audio/Video/Document With ${usedPrefix + command}`
  let media = await q.download()
  let audio = await toAudio(media, 'mp4')
  conn.sendFile(m.chat, audio, 'Den', 'Den', m, 0, { mimetype: 'audio/mp4' })
}
handler.help = ['mp3']
handler.tags = ['audio']

handler.command = /^(mp3)?$/i

module.exports = handler