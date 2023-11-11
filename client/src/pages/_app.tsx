import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} suppressHydrationWarning/>
  )
}
