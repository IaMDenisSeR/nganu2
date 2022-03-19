
const { MessageType } = require('@adiwajshing/baileys')
const { getBuffer } = require('../lib/save')
const fs = require('fs')
const axios = require("axios");
let fetch = require('node-fetch')
let handler  = async (m, { conn, text }) => {
let [ title1, dura, title, body, url ] = text.split(",")
let product = {
       key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})}, message: {"productMessage": {"product": {"productImage": {"mimetype": "image/jpeg", "jpegThumbnail": await getBuffer(url)}, "title": title1, "description": "hehe", "currencyCode": "IDR", "priceAmount1000": "9999999999", "retailerId": "X - Dev Team", "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}}
let groups = conn.chats.all().filter(v => v.jid.endsWith('g.us') && !v.read_only && v.message && !v.announce).map(v => v.jid)
let q = m.quoted ? m.quoted : m
let media = await q.download()
for (let id of groups) await conn.sendMessage(id, media, MessageType.audio, { mimetype: 'audio/mp4', duration: dura, ptt: true, quoted: product, contextInfo: { externalAdReply: { title: title, body: body, mediaType: "2", thumbnail: await getBuffer(url), mediaUrl: 'https://instagram.com/'}}})
}
handler.help = ['tobc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^tobc$/i
handler.owner = true


module.exports = handler
    