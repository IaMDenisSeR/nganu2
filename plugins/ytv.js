let limit = 30
const { MessageType } = require("@adiwajshing/baileys")
let fetch = require('node-fetch')
const { servers, ytv } = require('../lib/y2mate')
let Yt = /(?:http(?:s|):\/\/|)(?:(?:www\.|)?youtube(?:\-nocookie|)\.com\/(?:shorts\/)?(?:watch\?.*(?:|\&)v=|embed\/|v\/)?|youtu\.be\/)([-_0-9A-Za-z]{11})/
let handler = async (m, { conn, args, text, isOwner }) => {
  try {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if(!teks) return m.reply('```' + `Type The YouTube Url!` + '```')
  if (!teks.match(Yt)) return m.reply('```' + `Type The YouTube Url Only!` + '```')
  ytv(teks).then(async res => {
  m.reply('```Downloading...```')
  let { dl_link, thumb, title, filesizeF, filesize } = res
    let done = await getBuffer(dl_link)
    let tt = await getBuffer(thumb)
	if (Number(filesize) >= 40000) return m.reply('```File Over Limit: ```' + filesizeF + `Download Your Browser ${dl_link}`)
    await delay(1000)
	await conn.sendMessage(m.chat, '```' + `Uploading Video -` + `${title}` + '```', MessageType.text, { contextInfo: { externalAdReply: { title: `Ready To Play The Video\nSize: ${filesizeF}`, body: '', previewType:"2", thumbnail: await getBuffer(thumb), sourceUrl: teks }}})
    await conn.sendMessage(m.chat, done, MessageType.document, { mimetype: 'video/mp4', thumbnail: tt, filename: '.mp4', quoted: m})
})
	} catch (e) {
		m.reply('```' + e + '```')
		}
}
handler.help = [''].map(v => 'ytmp4' + v + ` <url> `)
handler.tags = ['downloader']
handler.command = /^(ytv|ytmpr|video)?$/i
handler.fail = null
handler.exp = 0

module.exports = handler

async function getBuffer(url) {
ff = await fetch(url)
fff = await ff.buffer()
return fff
}

function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}