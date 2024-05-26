'use client'
import React, { useState } from 'react'

function PostDataComponent() {
  const [responseData, setResponseData] = useState(null)

  const handleClick = async () => {
    try {
      const response = await fetch('/api/watch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: 'value' }),
      })

      if (!response.ok) {
        throw new Error('ネットワークエラー')
      }

      const data = await response.json()
      setResponseData(data)
    } catch (error) {
      console.error('エラー:', error)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>データをPOSTする</button>
      {responseData && (
        <div>
          <h2>サーバーからのレスポンス:</h2>
          <div>{JSON.stringify(responseData, null, 2)}</div>
        </div>
      )}
    </div>
  )
}

export default PostDataComponent
