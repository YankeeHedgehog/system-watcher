import { ChangeEvent, useState } from 'react'

export default function useControledText(defaultText: string) {
  const [text, setText] = useState(defaultText)

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return [text, { handleChangeText }] as const
}
