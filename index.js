import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import yargs from 'yargs'
import chalk from 'chalk'

console.log(chalk.magentaBright('\nIniciando....'))

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { name, description, author, version } = require(join(__dirname, './package.json'))
const rl = createInterface(process.stdin, process.stdout)

cfonts.say('StickerOfKings', {
  font: 'block',
  align: 'center',
  colors: ['blue', 'cyan'],
  gradient: ['magenta', 'yellow']
})

cfonts.say('Made With David-Chian', {
  font: 'console',
  align: 'center',
  colors: ['cyan', 'magenta', 'yellow']
})

let isRunning = false

function start(file) {
  if (isRunning) return
  isRunning = true

  let args = [join(__dirname, 'megumin', file), ...process.argv.slice(2)]
  cfonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    colors: ['white', 'blue']
  })

  setupMaster({
    exec: args[0],
    args: args.slice(1)
  })

  let p = fork()

  p.on('message', data => {
    switch (data) {
      case 'reset':
        p.process.kill()
        isRunning = false
        start(file)
        break
      case 'uptime':
        p.send(process.uptime())
        break
    }
  })

  p.on('exit', (_, code) => {
    isRunning = false
    console.error(chalk.redBright('🚩 Error:\n'), code)
    process.exit()
    if (code === 0) return
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
}

process.on('warning', warning => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.warn(chalk.yellow('🚩 Se excedió el límite de Listeners en:'))
    console.warn(warning.stack)
  }
})

// ...SEU CÓDIGO ATUAL ...

// ==========================================
// ✅ LINHAS CORRIGIDAS - NO FINAL DO ARQUIVO
// ==========================================

export { start }

// Iniciar automaticamente se for o processo principal
if (process.argv[2] !== 'qr' && process.argv[2] !== 'code') {
  start('start.js')  // ✅ MUDEI para 'start.js'
}

// Tratamento de erros para ambiente de produção
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não capturado:', error)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada:', reason)
})