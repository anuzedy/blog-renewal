import React from 'react'
import Category from '../components/Category'

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-8 gap-10'>
      {children}
    </div>
  )
}
