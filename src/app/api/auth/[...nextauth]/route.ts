import { verifyPassword } from "@/app/lib/auth";
import { getUserById } from "@/app/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "아이디", type: "text", placeholder: "아이디" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const userData = await getUserById(credentials?.username);

        if (
          userData.length > 0
        ) {
          const isValid = await verifyPassword(credentials?.password ?? '', userData[0]?.password);
          if (
            credentials?.username === userData[0].id &&
            isValid
          ) {
            const user = userData[0];
            user.name = user.id;
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const userData = await getUserById(session.user?.name ?? '');
      if (userData.length > 0) {
        session.user = {
          ...session.user,
          id: userData[0].id,
          nickname: userData[0].nickname,
          auth: userData[0].auth,
        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    maxAge: 60 * 60,
  },
  secret: process.env.SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }