import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { SiInstagram, SiWhatsapp } from 'react-icons/si'
import logo from '../cliente/logo.jpg'
import client from '../cliente/cliente.json'

const navigation = [
  { href: '/', label: 'Início' },
  { href: '/cardapio', label: 'Cardápio' },
  { href: '/ambiente', label: 'Ambiente' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/reserva', label: 'Reserva' },
]

export function SiteHeader({ currentPath }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-lockup" href="/" aria-label="Pérola Restaurante, início">
          <Image src={logo} alt="Logo do Pérola Restaurante" width={72} height={72} priority />
          <span>Pérola <small>Restaurante</small></span>
        </Link>
        <nav className="main-navigation" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={currentPath === item.href ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">Pérola Restaurante</p>
          <p>{client.slogan}</p>
        </div>
        <p className="footer-address">{client.endereco.completo}</p>
        <p className="footer-copy">© {new Date().getFullYear()} Pérola Restaurante</p>
      </div>
    </footer>
  )
}

export function SiteFrame({ children, currentPath }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader currentPath={currentPath} />
      {children}
      <SiteFooter />
    </>
  )
}

export function ContactLink({ kind, label, href, className = '' }) {
  const Icon = kind === 'instagram' ? SiInstagram : kind === 'whatsapp' ? SiWhatsapp : MapPin
  return (
    <a className={`action-link ${className}`} href={href} target="_blank" rel="noreferrer">
      <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" className="external-arrow" size={15} />
    </a>
  )
}

export function PageHeading({ eyebrow, title, introduction }) {
  return (
    <header className="page-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {introduction && <p className="page-lede">{introduction}</p>}
    </header>
  )
}

export function PhotoCredit({ children, href }) {
  return (
    <p className="photo-credit">
      <span>{children}</span>
      {href && <a href={href} target="_blank" rel="noreferrer">Crédito da imagem</a>}
    </p>
  )
}

export function InstagramLink({ compact = false }) {
  return (
    <ContactLink
      kind="instagram"
      label={compact ? 'Instagram' : `Acompanhe no Instagram ${client.instagram}`}
      href={client.links.instagram}
    />
  )
}

export function WhatsAppLink({ label = 'Falar pelo WhatsApp' }) {
  return <ContactLink kind="whatsapp" label={label} href={client.links.whatsapp} />
}

export function MapLink({ label = 'Ver localização no Google Maps' }) {
  return <ContactLink kind="maps" label={label} href={client.links.google_maps} />
}