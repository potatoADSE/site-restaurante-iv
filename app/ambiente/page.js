import Image from 'next/image'
import { PageHeading, PhotoCredit, SiteFrame } from '../components'
import { pageMetadata, readSiteCopy } from '../lib/content'

export async function generateMetadata() {
  return pageMetadata('environment')
}

export default async function EnvironmentPage() {
  const { environment } = await readSiteCopy()

  return (
    <SiteFrame currentPath="/ambiente">
      <main id="conteudo" className="page-main environment-page">
        <div className="content-width">
          <PageHeading eyebrow="Pérola Restaurante · Natal" title={environment.title} introduction={environment.introduction} />
        </div>
        <figure className="environment-photo">
          <Image
            src="/images/ponta-negra-sunset.jpg"
            alt="Orla de Ponta Negra ao entardecer, com a faixa de praia e o mar em Natal"
            fill
            sizes="100vw"
            priority
          />
          <figcaption>
            <span>Uma atmosfera praiana para aproveitar bons momentos.</span>
            <PhotoCredit href="https://commons.wikimedia.org/wiki/File:Entardecer_na_Praia_de_Ponta_Negra,_Natal-RN.jpg">
              Ponta Negra · Foto: Santacruzense · CC BY 4.0
            </PhotoCredit>
          </figcaption>
        </figure>
        <section className="environment-note content-width">
          <span className="section-marker">02 <span>À beira-mar</span></span>
          <p>{environment.supportingText}</p>
          <p className="asset-note">A fotografia mostra a orla de Ponta Negra, não o interior do restaurante. Fotos do ambiente do Pérola ainda não foram fornecidas.</p>
        </section>
      </main>
    </SiteFrame>
  )
}