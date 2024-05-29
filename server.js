const { createServer } = require('http')
const next = require('next')
const { Server } = require('socket.io')

const fs = require('fs')
var chokidar = require('chokidar')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

let watchFolder = path.join(__dirname, 'file-example')
console.log(__dirname)

let watcher = null

function startWatching(folderPath, io) {
  if (watcher) {
    watcher.close()
  }
  watcher = chokidar.watch(folderPath, {
    persistent: true,
    ignoreInitial: true,
    depth: 99, // サブフォルダーも監視
  })

  watcher
    .on('add', (path) => {
      console.log(`ファイルが追加されました: ${path}`)
      io.emit('file-changed', { eventType: 'add', filename: path })
    })
    .on('change', (path) => {
      console.log(`ファイルが変更されました: ${path}`)
      io.emit('file-changed', { eventType: 'change', filename: path })
    })
    .on('unlink', (path) => {
      console.log(`ファイルが削除されました: ${path}`)
      io.emit('file-changed', { eventType: 'unlink', filename: path })
    })
    .on('error', (error) => {
      console.error(`監視中にエラーが発生しました: ${error}`)
    })
}

app.prepare().then(() => {
  const httpServer = createServer(handler)
  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log('クライアントが接続しました')

    // 新しいフォルダーパスを受信
    socket.on('change-watch-folder', (newFolderPath) => {
      console.log(`新しいフォルダーパス: ${newFolderPath}`)
      watchFolder = newFolderPath
      startWatching(watchFolder, io)
    })
  })

  startWatching(watchFolder, io)

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
