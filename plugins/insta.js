const { igdl } = require('../lib/scrape')

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
try {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (!teks) throw '*Give A Instagram post/reel/tv!*'
  if (!teks.match(/https:\/\/www.instagram.com\/(p|reel|tv|s)/gi)) throw `post/reel/tv Supported`

  igdl(teks).then(async res => {
    let igdl = JSON.stringify(res)
    let json = JSON.parse(igdl)
    await m.reply('```Downloading..```')
    for (let { downloadUrl, type } of json) {
      conn.sendFile(m.chat, downloadUrl, 'ig' + (type == 'image' ? '.jpg' : '.mp4'), 'Den?')
    }
  })
} catch (e) {
	m.reply('```' + e + '```')
}
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(insta|ig)/i
//handler.premium = true

module.exports = handler