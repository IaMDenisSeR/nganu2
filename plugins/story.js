const { igstory } = require('../lib/scrape')

let handler = async (m, { conn, args, text, usedPrefix, command }) => {

  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (!teks) throw `*ᴜᴍᴍ..ᴡʜᴇʀᴇ ɪs ᴛʜᴇ ʟɪɴᴋ?*`
  
try {
  igstory(teks).then(async res => {
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
handler.help = ['igstory'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^story/i
//handler.premium = true

module.exports = handler