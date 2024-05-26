// pages/api/watch-files.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'http'
import { Server as SocketServer } from 'socket.io'
import chokidar from 'chokidar'

let io: SocketServer

export const config = {
  api: {
    bodyParser: false,
  },
}

export function POST(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.io')

    const httpServer = new Server(res.socket.server)
    io = new SocketServer(httpServer, {
      path: '/api/socketio',
    })

    httpServer.listen(res.socket.server.port, () => {
      console.log(`Socket.io server running on port ${res.socket.server.port}`)
    })

    const watcher = chokidar.watch(
      '/Users/yankee-hedgehog/Project/system-watcher/file-example',
      {
        persistent: true,
      }
    )

    watcher.on('change', (path) => {
      console.log(`File ${path} has been changed`)
      io.emit('file-changed', { path })
    })

    res.socket.server.io = io
  } else {
    console.log('Socket.io is already set up')
  }
  res.end()
}
