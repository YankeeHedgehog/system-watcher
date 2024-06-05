const { startWatching } = require('./file-watcher')

function setupSocketHandlers(io, watchFolder) {
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
}

module.exports = {
  setupSocketHandlers,
}
