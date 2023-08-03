'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Signup() {
  const { status } = useSession();
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [equalMessage, setEqualMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  }

  useEffect(() => {
    if (!(password === '' && passwordCheck === '')) {
      if (password === passwordCheck) {
        setEqualMessage('비밀번호가 일치합니다.');
      } else {
        setEqualMessage('비밀번호가 일치하지 않습니다.');
      }
    }
  }, [password, passwordCheck]);

  const router = useRouter();
  if (status === 'authenticated') {
    router.replace('/');
    return (
      <div>이미 로그인이 되어 있으므로 메인 페이지로 이동합니다.</div>
    );
  }

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const result = await createUser(
        id, password, nickname
      );
    } catch (err) {
    }
  }

  async function createUser(id: string, password: string, nickname: string): Promise<any> {
    axios.post('/api/auth/signup', {
      id,
      password,
      nickname
    })
      .then(response => {
        router.replace('/api/auth/signin');
      })
      .catch(err => {
        setSignupMessage(err.response.data.message);
      })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
      <form onSubmit={submitHandler} className="w-full max-w-xl mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">닉네임</label>
          <input onChange={onChangeNickname} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text" id="nickname" name="nickname" placeholder="닉네임" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">아이디</label>
          <input onChange={onChangeId} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text" id="id" name="id" placeholder="아이디" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">비밀번호</label>
          <input onChange={onChangePassword} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password" id="password" name="password" placeholder="********" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">비밀번호 확인</label>
          <input onChange={onChangePasswordCheck} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password" id="confirm-password" name="confirm-password" placeholder="********" />
        </div>
        <div>
          {equalMessage}
        </div>
        <br />
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit">회원가입</button>
        <br />
        <br />
        <div>
          {signupMessage}
        </div>
      </form>
    </div>
  )
}
