import express from 'express'

const app = express()
const port = process.env.PORT || 3000

// ✅ Adicione estas rotas:
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    bot: 'Megumin-Bot-MD',
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

// ✅ Iniciar servidor PRIMEIRO
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${port}`)
  
  // ✅ DEPOIS iniciar o bot
  import('./index.js').catch(error => {
    console.error('❌ Erro ao iniciar bot:', error)
  })
})

// ✅ Keep-alive
setInterval(() => {
  console.log('❤️  Bot ativo:', new Date().toLocaleString('pt-BR'))
}, 5 * 60 * 1000)