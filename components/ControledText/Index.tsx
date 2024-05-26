import { TextField } from '@mui/material'
import useControledText from './useControledText'

type Props = {
  defaultText: string
}

export default function ControledText({ defaultText = '' }: Props) {
  const [text, { handleChangeText }] = useControledText(defaultText)

  return <TextField value={text} onChange={handleChangeText} />
}
