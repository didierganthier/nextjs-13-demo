import '../styles/globals.css'
import Header from './header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
