import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

// GET - Buscar registros
// POST - Criar um registro
// PUT - Alterar um registro
// PATCH - Alterar uma informação específica de um registro
// DELETE - Remover um registro

// stateful - dados armazenados localmente em memoria
// stateless

const database = new Database()

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/Resposta) => Metadados

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: 1,
      name,
      email,
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
