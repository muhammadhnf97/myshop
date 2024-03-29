import './globals.css'
import { Providers } from './redux/Providers'

export const metadata = {
  title: 'My Shop',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-cover bg-bottom bg-fixed`} style={{backgroundImage: `url(/images/bg.png)`}}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
