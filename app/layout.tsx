import { Inter } from 'next/font/google'

export const metadata = {
  metadataBase: new URL('https://postgres-prisma.vercel.app'),
  title: 'システムのdbや、ファイル変更を監視するためのアプリケーションです',
  description: 'システム監視アプリケーション',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
