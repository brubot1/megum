import express from 'express'

const app = express()
const port = process.env.PORT || 3000

// Rota básica para Render não suspender
app.get('/', (req, res) => {
  res.send('🤖 Megumin Bot Online!')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})

// Importar SEU bot principal
import('./index.js').catch(error => {
  console.error('Erro ao iniciar bot:', error)
})

// Manter ativo - ping a cada 5 minutos
setInterval(() => {
  console.log('❤️  Bot ativo:', new Date().toLocaleString('pt-BR'))
}, 5 * 60 * 1000)