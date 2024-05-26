'use client'

import { TextField, Button } from '@mui/material'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'

const Home: React.FC = () => {
  const [filePath, setFilePath] = useState('')

  const request = () => axios.post('/api/watch', { filePath: filePath }).then()

  const changeFileName = (e: ChangeEvent<HTMLInputElement>) => {
    setFilePath(e.target.value)
  }

  return (
    <>
      <TextField value={filePath} onChange={changeFileName} fullWidth />
      <Button onClick={request}>リクエスト</Button>
    </>
  )
}

export default Home
