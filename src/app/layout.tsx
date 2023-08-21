import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthSession from './components/AuthSession'

export const metadata = {
  title: '잡동사니 창고',
  description: '굿',
  icons: {
    icon: '/favicon.ico',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex flex-col w-full max-w-screen-3xl px-10 mx-auto'>
        <AuthSession>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </AuthSession>
      </body>
    </html>
  )
}
