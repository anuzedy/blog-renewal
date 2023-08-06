import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import Signin from '../../components/Signin';

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignInPage({ searchParams: { callbackUrl } }: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <Signin callbackUrl={callbackUrl} />
  );
}
