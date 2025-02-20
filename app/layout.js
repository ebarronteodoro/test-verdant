import './styles/globals.css'
import Header from '@/app/components/Header'
import { Poppins } from 'next/font/google'

const poppinsSans = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <head>
        <link rel="icon" href="/page-icon.png" />
      </head>
      <body className={poppinsSans.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
