import http from 'node:http'

// GET - Buscar registros
// POST - Criar um registro
// PUT - Alterar um registro
// PATCH - Alterar uma informação específica de um registro
// DELETE - Remover um registro

// stateful - dados armazenados localmente em memoria
// stateless

const users = []

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/Resposta) => Metadados

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  console.log(req)

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email,
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
