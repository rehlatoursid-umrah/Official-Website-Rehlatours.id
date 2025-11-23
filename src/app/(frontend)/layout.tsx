import React from 'react'
import "../(frontend)/styles.css";


export const metadata = {
  description:
    'Rehlatours.id - Umroh Ditangan Anda. Wujudkan impian umroh Anda dengan fasilitas premium dan harga terjangkau.',
  title: 'Rehlatours.id - Umroh Ditangan Anda | Paket Umroh Terbaik Indonesia',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3A0519" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
