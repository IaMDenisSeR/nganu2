

let handler = async (m, { conn, text }) => {

let sendq = await conn.serializeM(await m.getQuotedObj())
        if (!sendq.quoted) throw '```The Message You Reply Does Not Contain a Reply!!```'
        await sendq.quoted.copyNForward(m.chat, false)
            }
            
handler.help = ['quoted'].map((v) => v + " <text>")
handler.tags = ['info']

handler.command = /^(q|quoted)?$/i

module.exports = handler