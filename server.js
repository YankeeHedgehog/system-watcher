const { createServer } = require('http')
const next = require('next')
const { Server } = require('socket.io')
const { Client } = require('pg')
const chokidar = require('chokidar')
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

// PostgreSQLのクライアント設定
const client = new Client({
  // user: process.env.POSTGRES_USER,
  // host: process.env.POSTGRES_HOST,
  // database: process.env.POSTGRE_DATABASE,
  // password: process.env.POSTGRES_PASSWORD,
  // port: 5432,
  user: 'ciro',
  host: 'localhost',
  database: 'system-watch-db',

  password: 'ciro0022',
  port: 5433,
})

client.on('error', (err) => {
  console.error('PostgreSQL client error:', err)
  if (err.code === 'ECONNRESET') {
    // 再接続ロジックを追加
    setTimeout(() => {
      client.connect().catch((err) => console.error('Error reconnecting:', err))
    }, 5000) // 5秒後に再接続を試みる
  }
})

client
  .connect()
  .catch((err) => console.error('Error connecting to PostgreSQL:', err))

// PostgreSQLの変更を監視
const fetchChanges = async (io) => {
  try {
    const res = await client.query(
      "SELECT data FROM pg_logical_slot_get_changes('my_slot', NULL, NULL, 'include-xids', '0')"
    )
    res.rows.forEach((row) => {
      io.emit('db-changed', row.data)
    })
  } catch (err) {
    console.error('Error fetching changes:', err)
  }
}

app.prepare().then(() => {
  const httpServer = createServer(handler)
  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log('クライアントが接続しました')

    // WebSocketのエラー処理を追加
    socket.on('error', (err) => {
      console.error('WebSocket error:', err)
    })

    // 新しいフォルダーパスを受信
    socket.on('change-watch-folder', (newFolderPath) => {
      console.log(`新しいフォルダーパス: ${newFolderPath}`)
      watchFolder = newFolderPath
      startWatching(watchFolder, io)
    })

    // クライアント切断時の処理
    socket.on('disconnect', () => {
      console.log('クライアントが切断しました')
    })
  })

  // 初期監視開始
  startWatching(watchFolder, io)

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
