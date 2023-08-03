import Footer from '@/components/template/footer'
import Header from '@/components/template/header/header'
import { NextAuthProvider } from '@/providers/auth'
import ToastProvider from '@/providers/toast'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Trips',
  description: 'Sistema de reserva de viagens!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <Header />

            {children}

            <Footer />
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
