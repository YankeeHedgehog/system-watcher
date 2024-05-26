import { useState, useEffect } from 'react'

const IndexPage = () => {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/content')
      const data = await res.json()
      setContent(data.content)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>File Content:</h1>
      <pre>{content}</pre>
    </div>
  )
}

export default IndexPage
