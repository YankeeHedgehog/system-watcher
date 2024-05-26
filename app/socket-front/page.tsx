'use client'
import { Button, TextField } from '@mui/material'
// pages/index.js
import { ChangeEvent, useEffect, useState } from 'react'
import io from 'socket.io-client'

const Home = () => {
  const [folderNameToWatch, setForlderNameToWatch] = useState('')
  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setForlderNameToWatch(e.target.value)
  }

  const handleSendFolderPathToWatch = () => {
    // const newFolderPath
    const socket = io()
    socket.emit('change-watch-folder', folderNameToWatch)
  }

  const [messages, setMessages] = useState<any>([])
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
  }, [folderNameToWatch])

  return (
    <div>
      <h1>リアルタイムファイルウォッチャー</h1>

      <TextField
        value={folderNameToWatch}
        onChange={handleChangeText}
        placeholder="監視するフォルダパスを入力"
      />
      <Button onClick={handleSendFolderPathToWatch}>
        watchするフォルダ名を送信
      </Button>
      <ul>
        {messages.map((msg: any, index: number) => (
          <li key={index}>
            {msg.filename}が{msg.eventType}されました
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
