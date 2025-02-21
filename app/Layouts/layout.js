import '../styles/globals.css'
import Header from '@/app/components/Header'
import { Poppins } from 'next/font/google'
import VerdantFloatingButton from '../components/VerdantFloatingButton'

const poppinsSans = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function Layout ({ children }) {
  return (
    <>
      <Header />
      <main className={poppinsSans.className}>{children}</main>
      <VerdantFloatingButton />
    </>
  )
}
