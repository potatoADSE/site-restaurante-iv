import Image from 'next/image'
import client from '../../cliente/cliente.json'
import { MapLink, PageHeading, SiteFrame } from '../components'
import { pageMetadata, readSiteCopy } from '../lib/content'

export async function generateMetadata() {
  return pageMetadata('about')
}

export default async function AboutPage() {
  const { about } = await readSiteCopy()
  const mapUrl = 'https://www.google.com/maps?output=embed&q=-5.8813215%2C-35.1716003&z=16'

  return (
    <SiteFrame currentPath="/sobre">
      <main id="conteudo" className="page-main about-page">
        <div className="content-width">
          <PageHeading eyebrow="Pérola Restaurante · Ponta Negra" title={about.title} introduction={about.introduction} />
          <section className="about-proposal" aria-labelledby="about-proposal-title">
            <span className="section-marker">01 <span>Nossa proposta</span></span>
            <div>
              <h2 id="about-proposal-title">{about.proposalTitle}</h2>
              <p>{about.proposal}</p>
            </div>
            <div className="about-landscape">
              <Image src="/images/ponta-negra-sunset.jpg" alt="Vista da orla de Ponta Negra, onde está localizado o Pérola Restaurante" fill sizes="(max-width: 760px) 100vw, 48vw" loading="lazy" />
            </div>
          </section>

          <section className="location-section" aria-labelledby="location-title">
            <div className="location-copy">
              <span className="section-marker">02 <span>Localização</span></span>
              <h2 id="location-title">À beira-mar em Ponta Negra.</h2>
              <address>{client.endereco.completo}</address>
              <MapLink />
            </div>
            <div className="map-frame">
              <iframe
                title="Mapa do Pérola Restaurante na orla de Ponta Negra, Natal"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </section>
        </div>
      </main>
    </SiteFrame>
  )
}