import { Inter } from "next/font/google";
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    <html lang="pt-br" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}