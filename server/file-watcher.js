const chokidar = require('chokidar')

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

module.exports = {
  startWatching,
}
