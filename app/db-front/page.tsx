import { useEffect, useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/api/changes')

    ws.onmessage = (event) => {
      const newMessage = event.data
      setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    ws.onopen = () => {
      console.log('WebSocket connection opened')
    }

    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <div>
      <h1>Database Changes</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  )
}
