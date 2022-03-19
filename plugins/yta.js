let limit = 30
const { MessageType } = require("@adiwajshing/baileys")
const { servers, yta } = require('../lib/y2mate')
let Yt = /(?:http(?:s|):\/\/|)(?:(?:www\.|)?youtube(?:\-nocookie|)\.com\/(?:shorts\/)?(?:watch\?.*(?:|\&)v=|embed\/|v\/)?|youtu\.be\/)([-_0-9A-Za-z]{11})/
let fetch = require('node-fetch')
let handler = async (m, { conn, args, text, isOwner }) => {
  try {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if(!teks) throw 'Type The YouTube Url!'
  if (!teks.match(Yt)) throw 'Only Work This Command Yt URLs!!'
  yta(teks).then(async res => {
  m.reply('```Downloading...```')
  let { dl_link, thumb, title, filesizeF, filesize } = res
	if (Number(filesize) >= 40000) return m.reply('```File Over Limit: ```' + filesizeF + `Download Your Browser ${dl_link}`)
	
	let th = await getBuffer(thumb)
	let eh = await getBuffer(dl_link)
	await delay(1000)
	await conn.sendMessage(m.chat, '```' + `Uploading Song -` + `${title}` + '```', MessageType.text, { contextInfo: { externalAdReply: { title: `Ready To Play The Song\nSize: ${filesizeF}`, body: '', previewType:"2", thumbnail: th, sourceUrl: teks}}})
	await conn.sendMessage(m.chat, eh, MessageType.audio, { mimetype: 'audio/mp4', filename: 'Den?.mp3', quoted: m})
	  })
	} catch (e) {
		m.reply('```' + e + '```')
		}
}
handler.help = [].map(v => 'yta' + v + `<url>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
handler.owner = false
handler.mods = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

async function getBuffer(url) {
ff = await fetch(url)
fff = await ff.buffer()
return fff
}

async function shortlink(url) {
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}

const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        
function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}