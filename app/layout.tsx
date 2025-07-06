import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sampa Mov',
  description: 'Somos especialistas em criar conteúdo que conecta marcas ao seu público de forma autêntica e impactante.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
