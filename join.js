let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
	try {
	let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    let [_, code] = teks.match(linkRegex) || []
    if (!code) throw 'Invalid Link'
    let res = await conn.acceptInvite(code)
    m.reply('```Joined.```')
    } catch (e) {
    	m.reply('```Check The Link Is Correct..```')
    }
}
handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['owner']

handler.command = /^join$/i
handler.owner = true
module.exports = handler
