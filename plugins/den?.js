
const { MessageType } = require("@adiwajshing/baileys")
const fs = require('fs')

let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
if (m.key.fromMe) return 
if (m.isBaileys) return 
  if (m.mentionedJid.includes(conn.user.jid)) {
  let msg = db.data.msgs
  let nan = fs.readFileSync(`./src/${msg}.mp3`)
  let eh = nan[Math.floor(Math.random() * nan.length)]
conn.sendMessage(m.chat, eh, MessageType.audio, { mimetype: 'audio/mp4', ptt: true, quoted: m})
}
  return true
}

module.exports = handler