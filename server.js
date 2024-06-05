const { createServer } = require('http')
const next = require('next')
const { Server } = require('socket.io')
const path = require('path')
const { setupSocketHandlers } = require('./server/socket-handler')
const { fetchChanges } = require('./server/postgres-db-client')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

let watchFolder = path.join(__dirname, 'file-example')
console.log(__dirname)

app.prepare().then(() => {
  const httpServer = createServer(handler)
  const io = new Server(httpServer)

  setupSocketHandlers(io, watchFolder)

  // 定期的に変更をチェック
  setInterval(() => fetchChanges(io), 1000)

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
