import express from 'express'
import fetch from 'node-fetch'  // 👈 ADICIONAR ESTA LINHA

const app = express()
const port = process.env.PORT || 8080

// Rotas para manter ativo
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    bot: 'Megumin-Bot-MD',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' })
})

app.get('/ping', (req, res) => {
  res.json({ ping: 'pong' })
})

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${port}`)
  
  // Iniciar bot
  import('./index.js').catch(error => {
    console.error('❌ Erro ao iniciar bot:', error)
  })
})

// ✅ KEEP-ALIVE MAIS RÁPIDO (CADA 2 MINUTOS)
setInterval(async () => {
  const now = new Date().toLocaleString('pt-BR')
  console.log(`❤️  Keep-alive: ${now}`)
  
  try {
    // Faz ping em si mesmo para manter ativo
    await fetch(`http://localhost:${port}/ping`)
    console.log('✅ Ping realizado com sucesso')
  } catch (error) {
    console.log('⚠️  Ping falhou, mas continuando...')
  }
}, 2 * 60 * 1000) // 👈 A CADA 2 MINUTOS (não 5)