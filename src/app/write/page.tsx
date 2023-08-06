import React from 'react'
import PublishPost from '../components/PublishPost'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function WritePage() {
  const session = await getServerSession(authOptions);

  if (session?.user.auth !== 'admin') {
    redirect('/');
  }

  return (
    <PublishPost />
  )
}
