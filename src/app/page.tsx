'use client';
import { Inter } from 'next/font/google'
import RecentCarousel from './components/RecentCarousel'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='mx-5'>
      <h1 className='my-10'>최근 게시물</h1>
      <RecentCarousel deviceType='desktop' />
    </div>
  )
}
