'use client';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const onLogoutClick = () => {
    signOut();
  }

  const onLoginClick = () => {
    signIn();
  }

  return (
    <header>
      <div className='flex justify-between items-center p-4'>
        <Link href='/'>
          <h1 className='inline-block text-3xl text-bold py-7'>잡동사니 블로그</h1>
        </Link>
        <nav className='flex gap-5'>
          {
            status === 'authenticated' ? (
              <>
                {user?.nickname}님 환영합니다.
                <button onClick={onLogoutClick}>로그아웃</button>
              </>
            ) : (
              <>
                <button onClick={onLoginClick}>로그인</button>
                <Link href={'/auth/signup'}><button>회원가입</button></Link>
              </>
            )
          }
        </nav>
      </div>
      <nav className='border border-solid px-5 py-5'>
        <Link className='pr-8' href='/'>홈</Link>
        <Link href={`/post/all/0`}>포스트</Link>
      </nav>
    </header>
  )
}
