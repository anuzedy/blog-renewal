'use client';
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

type Props = {
  callbackUrl: string;
}

export default function Signin({ callbackUrl }: Props) {
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(callbackUrl);
    }
  });

  const [resultMessage, setResultMessage] = useState<any>('');
  const [id, setId] = useState<String>('');
  const [password, setPassword] = useState<String>('');

  const idInput = useRef(null);
  const passwordInput = useRef(null);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", { redirect: false, username: id, password, callbackUrl });
    if (result?.error) {
      setResultMessage(result.error);
    } else {
      router.replace(callbackUrl);
    }
    setLoading(false);
  }

  return (
    <>
      {
        loading ?
          <LoadingSpinner /> : null
      }
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto bg-white p-8 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">아이디</label>
            <input onChange={onChangeId} ref={idInput} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text" id="id" name="id" placeholder="아이디" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">비밀번호</label>
            <input onChange={onChangePassword} ref={passwordInput} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password" id="password" name="password" placeholder="********" />
          </div>
          <div>
            {resultMessage}
          </div>
          <br />
          <button className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit">로그인</button>
        </form>
      </div>
    </>
  )
}
