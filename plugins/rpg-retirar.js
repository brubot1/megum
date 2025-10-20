import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply('🚩 Ingresa la cantidad de *Chocolates 🍫* que deseas Retirar.')
if (args[0] == 'all') {
let count = parseInt(user.bank)
user.bank -= count * 1
user.chocolates += count * 1
await m.reply(`🚩 Retiraste *${count} Chocolates 🍫* del Banco.`)
return !0
}
if (!Number(args[0])) return m.reply('🚩 La cantidad deve ser un Numero.')
let count = parseInt(args[0])
if (!user.bank) return m.reply('No tienes *Chocolate 🍫* en el Banco.')
if (user.bank < count) return m.reply(`Solo tienes *${user.bank} Chocolates 🍫* en el Banco.`)
user.bank -= count * 1
user.chocolates += count * 1
await m.reply(`🚩 Retiraste *${count} Chocolates 🍫* del Banco.`)}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'wd']
handler.register = true
export default handler