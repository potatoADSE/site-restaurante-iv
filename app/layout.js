import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/fraunces/400.css'
import '@fontsource/fraunces/700.css'
import './globals.css'
import client from '../cliente/cliente.json'
import ScrollToTop from './scroll-to-top'

export const metadata = {
  title: client.nome,
  description: client.descricao,
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}