const { Client } = require('pg')

const client = new Client({
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

module.exports = {
  fetchChanges,
}
