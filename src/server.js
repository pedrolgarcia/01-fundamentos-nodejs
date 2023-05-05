import http from 'node:http'

import { routes } from './routes.js'

import { json } from './middlewares/json.js'

import { extractQueryParams } from './utils/extract-query-params.js'

// GET - Buscar registros
// POST - Criar um registro
// PUT - Alterar um registro
// PATCH - Alterar uma informação específica de um registro
// DELETE - Remover um registro

// stateful - dados armazenados localmente em memoria
// stateless

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/Resposta) => Metadados

// Query Parameters: URL Stateful => Filtros, paginação, não obrigatórios - ex: http://localhost:3333/users?userId=1&name=Pedro
// Route Parameters: Identificação de recurso - ex: http://localhost:3333/users/1
// Request Body: Envio de informações de um formulário (HTTPs) - ex: { "name": "Pedro", "email": "pedro@pedro.com" }

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups
    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
