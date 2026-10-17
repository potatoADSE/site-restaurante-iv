import Image from 'next/image'
import Link from 'next/link'
import client from '../cliente/cliente.json'
import { InstagramLink, MapLink, PhotoCredit, SiteFrame, WhatsAppLink } from './components'
import { pageMetadata, readSiteCopy } from './lib/content'

export async function generateMetadata() {
  return pageMetadata('home')
}

export default async function HomePage() {
  const { home } = await readSiteCopy()

  return (
    <SiteFrame currentPath="/">
      <main id="conteudo">
        <section className="home-hero" aria-labelledby="home-title">
          <Image
            className="hero-photo"
            src="/images/ponta-negra-sunset.jpg"
            alt="Fim de tarde na orla de Ponta Negra, Natal"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-veil" />
          <div className="hero-content">
            <p className="hero-kicker"><span /> À beira-mar em Ponta Negra</p>
            <h1 id="home-title">{home.title}</h1>
            <p className="hero-slogan">{home.slogan}</p>
            <p className="hero-description">{home.introduction}</p>
            <div className="hero-actions">
              <Link className="action-link action-primary" href="/cardapio">Ver cardápio</Link>
              <WhatsAppLink label="Solicitar reserva" />
              <InstagramLink compact />
            </div>
          </div>
          <PhotoCredit href="https://commons.wikimedia.org/wiki/File:Entardecer_na_Praia_de_Ponta_Negra,_Natal-RN.jpg">
            Foto: Santacruzense · Wikimedia Commons · CC BY 4.0
          </PhotoCredit>
        </section>

        <section className="home-intro content-width" aria-labelledby="home-intro-title">
          <div className="section-marker">01 <span>O Pérola</span></div>
          <div className="intro-copy">
            <h2 id="home-intro-title">Gastronomia local, massas, pizzas e bons momentos.</h2>
            <p>{home.introduction}</p>
          </div>
          <div className="intro-location">
            <MapLink />
            <p>{client.endereco.completo}</p>
          </div>
        </section>

        <section className="home-menu-band" aria-labelledby="menu-band-title">
          <div className="content-width menu-band-inner">
            <p className="eyebrow">Da nossa cozinha</p>
            <h2 id="menu-band-title">Sabores para aproveitar<br />no seu tempo.</h2>
            <p>Gastronomia local, massas, pizzas, drinques e sobremesas à beira-mar.</p>
          </div>
          <div className="menu-band-image" aria-hidden="true">
            <Image src="/images/pizza.jpg" alt="" fill sizes="(max-width: 700px) 100vw, 46vw" />
            <span className="menu-image-note">Imagem ilustrativa</span>
          </div>
        </section>

        <section className="home-close" aria-labelledby="home-close-title">
          <Image src="/images/ponta-negra-sunset.jpg" alt="Orla de Ponta Negra ao entardecer; fotografia da região, não do salão do restaurante" fill sizes="100vw" />
          <div className="home-close-veil" />
          <div className="home-close-copy">
            <p className="eyebrow">Natal, Rio Grande do Norte</p>
            <h2 id="home-close-title">{home.close}</h2>
          </div>
          <PhotoCredit href="https://commons.wikimedia.org/wiki/File:Entardecer_na_Praia_de_Ponta_Negra,_Natal-RN.jpg">
            Foto: Santacruzense · Wikimedia Commons · CC BY 4.0
          </PhotoCredit>
        </section>
      </main>
    </SiteFrame>
  )
}