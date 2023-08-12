import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Signup from '@/app/components/Signup';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function SignUp() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <Signup />
  );
}
