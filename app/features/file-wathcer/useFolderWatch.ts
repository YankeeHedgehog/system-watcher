import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function useFolderWatch(folderPath: string) {
  const [messages, setMessages] = useState<Message[]>([])

  // socket.ioを通じて、ファイル変更のメッセージを受信する
  let socket: any
  useEffect(() => {
    // Socket.IOクライアントを初期化
    socket = io()

    // サーバーからのメッセージを受け取る
    socket.on('file-changed', (data: any) => {
      setMessages((prevMessages: any) => [...prevMessages, data])
    })

    // クリーンアップ
    return () => {
      if (socket) socket.disconnect()
    }
  }, [folderPath])

  return [messages, {}] as const
}

type Message = {
  filename: string
  eventType: string | Buffer | null
}
