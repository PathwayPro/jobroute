import Body from "@/components/Body";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='min-h-screen grid grid-cols-12'>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}
