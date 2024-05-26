import { watch } from 'fs'
import { NextResponse } from 'next/server'
import { corsHeaders } from '../headers'
import { NextApiResponse } from 'next'

export async function POST(req: Request, res: NextApiResponse) {
  const { filePath } = await req.json()

  if (!filePath) {
    return NextResponse.json({ error: 'NotFound' })
  }
  console.log('ファイル名を出力')
  console.log(filePath)

  // ファイルの変更を監視
  const watcher = watch(
    filePath,
    (eventType: string, filename: string | null) => {
      if (filename) {
        const message = `${filename} が ${eventType} されました。`
        console.log(message) // ログを出力
        // クライアントに通知
        return Response.json({ message })
        // res.status(200).json({ message });
      }
    }
  )

  // // クライアントが接続を切断したら監視を停止する
  // res.on('close', () => {
  //   watcher.close()
  // })

  return NextResponse.json(
    { message: `Watching for changes on ${filePath}` },
    { status: 200, headers: corsHeaders }
  )
}
