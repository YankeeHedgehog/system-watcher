'use client'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export default function Home() {
  const [fileChanges, setFileChanges] = useState([])
  const [dbChanges, setDbChanges] = useState([])

  useEffect(() => {
    const socket = io('http://localhost:3000') // Socket.ioクライアントを使用

    socket.on('connect', () => {
      console.log('WebSocket connection opened')
    })

    socket.on('file-changed', (data) => {
      setFileChanges((prevChanges) => [...prevChanges, data])
    })

    socket.on('db-changed', (data) => {
      setDbChanges((prevChanges) => [...prevChanges, data])
    })

    socket.on('error', (error) => {
      console.error('WebSocket error:', error)
    })

    socket.on('disconnect', () => {
      console.log('WebSocket connection closed')
      // 再接続はSocket.ioが自動的に処理する
    })

    return () => {
      socket.close()
    }
  }, [])

  return (
    <div>
      <h1>File Changes</h1>
      <ul>
        {fileChanges.map((change, index) => (
          <li key={index}>{`${change.eventType}: ${change.filename}`}</li>
        ))}
      </ul>

      <h1>Database Changes</h1>
      <ul>
        {dbChanges.map((change, index) => (
          <li key={index}>{change}</li>
        ))}
      </ul>
    </div>
  )
}
