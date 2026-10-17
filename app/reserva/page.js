import client from '../../cliente/cliente.json'
import { InstagramLink, MapLink, PageHeading, SiteFrame, WhatsAppLink } from '../components'
import { pageMetadata, readSiteCopy } from '../lib/content'

export async function generateMetadata() {
  return pageMetadata('reservation')
}

export default async function ReservationPage() {
  const { reservation } = await readSiteCopy()

  return (
    <SiteFrame currentPath="/reserva">
      <main id="conteudo" className="page-main reservation-page">
        <div className="content-width">
          <PageHeading eyebrow="Pérola Restaurante · Ponta Negra" title={reservation.title} introduction={reservation.instructions} />
          <section className="reservation-contact" aria-labelledby="reservation-contact-title">
            <div className="reservation-primary">
              <p className="eyebrow">Solicitação de reserva</p>
              <h2 id="reservation-contact-title">Vamos conversar pelo WhatsApp.</h2>
              <p>Envie sua solicitação à equipe. A reserva só estará confirmada após o retorno do restaurante.</p>
              <WhatsAppLink label="Solicitar reserva pelo WhatsApp" />
            </div>
            <div className="reservation-details">
              <h2>Contato e endereço</h2>
              <a className="detail-line" href={`tel:${client.telefone}`}><span>Telefone</span><strong>{client.telefone}</strong></a>
              <p className="detail-line"><span>Endereço</span><strong>{client.endereco.completo}</strong></p>
              <InstagramLink compact />
              <MapLink />
            </div>
          </section>
        </div>
      </main>
    </SiteFrame>
  )
}