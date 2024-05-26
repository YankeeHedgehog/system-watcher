import { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

declare module 'next' {
  interface NextApiResponse {
    socket: {
      server: HttpServer & {
        io: SocketIOServer
      }
    }
  }
}
