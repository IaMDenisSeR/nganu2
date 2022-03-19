let { WAMessageProto } = require('@adiwajshing/baileys')

let handler = async (m, { conn, command, usedPrefix, text }) => {
    let M = WAMessageProto.WebMessageInfo
    
    if (!m.quoted) throw '*Reply A Message!*'
    
    let msgs = db.data.msgs
    
    msgs[m.quoted] = M.fromObject(await m.getQuotedObj()).toJSON()
    if (db.data.chats[m.chat].getmsg) return m.reply('*Added*')
}
handler.help = ['addfav']
handler.tags = ['database']
handler.command = /^(\+|add)(fav)$/

module.exports = handler