const express = require('express')
const cors = require('cors')

// initialize express server
const api = express()
api.use(cors({ origin: true }))

// define api endpoints
api.get('/', (_request, response) =>
  response.send(
    `Sharing Excess API, ©${new Date().getFullYear()}, All Rights Reserved.`
  )
)
api.get('/rescues', (req, res) => loadEndpoint('rescues', req, res))
api.get('/rescues/:id', (req, res) => loadEndpoint('rescue', req, res))
api.get('/stops/:id', (req, res) => loadEndpoint('stop', req, res))
api.get('/analytics', (req, res) => loadEndpoint('analytics', req, res))
api.get('/impact', (req, res) => loadEndpoint('impact', req, res))
api.post('/calendar/add', (req, res) =>
  loadEndpoint('addCalendarEvent', req, res)
)
api.post('/calendar/delete', (req, res) =>
  loadEndpoint('deleteCalendarEvent', req, res)
)
api.post('/rescues/:id/update', (req, res) =>
  loadEndpoint('updateRescue', req, res)
)
api.post('/stops/:id/update', (req, res) =>
  loadEndpoint('updateStop', req, res)
)

// we do this to dynamically load only the necessary endpoint code and improve cold start/runtime performance
function loadEndpoint(name, request, response) {
  const module = require(`./${name}`)
  console.log(name, module)
  const endpoint = module[`${name}Endpoint`]
  return endpoint(request, response)
}

// export express server instance
exports.api = api
